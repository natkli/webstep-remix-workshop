import { Form, Link, useActionData } from "@remix-run/react";
import {
  json,
  redirect,
  type ActionArgs,
  type LoaderArgs,
  type MetaFunction,
} from "@remix-run/server-runtime";
import { useEffect, useRef } from "react";
import { TextInput } from "~/components/TextInput";
import { createEvent } from "~/models/event.server";
import { requireUserId } from "~/session.server";

export const meta: MetaFunction = () => {
  return {
    title: "Icing | Create new event",
  };
};

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);
  return json({});
}

// Oppgave 4.1
export async function action({ request }: ActionArgs) {
  return json({});
}

export default function NewEventPage() {
  // const actionData = useActionData<typeof action>();
  // const titleRef = useRef<HTMLInputElement>(null);
  // const locationRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (actionData?.errors?.title) {
  //     titleRef.current?.focus();
  //   } else if (actionData?.errors?.location) {
  //     locationRef.current?.focus();
  //   }
  // }, [actionData]);

  return (
    <div className="min-h-full w-full">
      <h1 className="my-4 text-center text-2xl font-bold">Create new event</h1>
      <Form method="post" className="flex w-full flex-col items-center">
        <TextInput
          label="Event title"
          name="title"
          // error={actionData?.errors.title}
        />

        <TextInput
          label="Location"
          name="location"
          // error={actionData?.errors.location}
        />

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
