import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import { TbCalendarEvent, TbLocation } from "react-icons/tb";
import invariant from "tiny-invariant";

import { EventIcingItem } from "~/components/events/eventIcingItem";
import { StickyButton } from "~/components/StickyButton";
import { deleteEvent, getEvent } from "~/models/event.server";
import { requireUserId } from "~/session.server";
import { formattedDate, useOptionalUser } from "~/utils";

export async function loader({ params }: LoaderArgs) {
  invariant(params.eventId, "eventId not found");

  const event = await getEvent({ id: params.eventId });
  if (!event) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ event });
}

export async function action({ request, params }: ActionArgs) {
  const userId = await requireUserId(request);
  invariant(params.eventId, "eventId not found");

  await deleteEvent({ userId, id: params.eventId });
  return redirect("/");
}

export default function EventDetailsPage() {
  const user = useOptionalUser();
  const data = useLoaderData<typeof loader>();
  const { id, title, location, createdBy, createdAt } = data.event;

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <h1 className="card-title">{title}</h1>
          <p className="text-icing-red">@{createdBy.username}</p>
        </div>
        <div className="mt-2 flex gap-4 text-sm text-base-600">
          <p className="flex items-center gap-1">
            <TbCalendarEvent size={15} />
            {formattedDate(createdAt)}
          </p>
          <p className="inline-flex items-center gap-1">
            <TbLocation size={13} />
            {location}
          </p>
        </div>
      </div>

      <div className="my-8">
        <EventIcingItem />
        <EventIcingItem />
        <EventIcingItem />
      </div>

      <Form method="post" className="mt-16 flex flex-col items-center">
        {createdBy.id === user?.id && (
          <button
            type="submit"
            className="btn-outline btn-warning btn-sm btn flex gap-1"
          >
            Delete event
          </button>
        )}
      </Form>
      <StickyButton url={`/events/${id}/new`} />
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
