import { Form, Link, useActionData } from "@remix-run/react";
import {
  json,
  redirect,
  type ActionArgs,
  type LoaderArgs,
  type MetaFunction,
} from "@remix-run/server-runtime";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { createEvent } from "~/models/event.server";
import { requireUserId } from "~/session.server";

export const meta: MetaFunction = () => {
  return {
    title: "Icing | New event",
  };
};

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);
  return json({});
}

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const location = formData.get("location");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { title: "Event title is required", location: null } },
      { status: 400 }
    );
  }

  if (typeof location !== "string" || location.length === 0) {
    return json(
      { errors: { title: null, location: "Location is required" } },
      { status: 400 }
    );
  }

  const event = await createEvent({ title, location, userId });

  return redirect(`/events/${event.id}`);
}

export default function NewEventPage() {
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.location) {
      locationRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="min-h-full w-full">
      <h1 className="my-4 text-center text-2xl font-bold">New event</h1>
      <Form method="post" className="flex w-full flex-col items-center">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text-alt text-sm">Event title</span>
            {actionData?.errors.title && (
              <span className="label-text-alt text-warning">
                {actionData.errors.title}
              </span>
            )}
          </label>
          <input
            type="text"
            name="title"
            ref={titleRef}
            className={clsx(
              "input-bordered input w-full max-w-xs",
              actionData?.errors.title && "input-warning"
            )}
          />
        </div>
        <div className="form-control mt-2 w-full max-w-xs">
          <label className="label">
            <span className="label-text-alt text-sm">Location</span>
            {actionData?.errors.location && (
              <span className="label-text-alt text-warning">
                {actionData.errors.location}
              </span>
            )}
          </label>
          <input
            type="text"
            ref={locationRef}
            name="location"
            className={clsx(
              "input-bordered input w-full max-w-xs",
              actionData?.errors.location && "input-warning"
            )}
          />
        </div>
        <div className="mt-8 flex justify-start gap-4">
          <Link to="/" className="btn-outline  btn-secondary btn">
            Cancel
          </Link>
          <button type="submit" className="btn-primary btn">
            Create
          </button>
        </div>
      </Form>
    </div>
  );
}
