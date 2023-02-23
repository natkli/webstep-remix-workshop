import {
  json,
  redirect,
  type ActionArgs,
  type LoaderArgs,
} from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import {
  TbArrowLeft,
  TbCalendarEvent,
  TbLocation,
  TbTrash,
  TbUser,
} from "react-icons/tb";
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
      <div className="mb-8 flex justify-between">
        <a
          className="link-primary link flex items-center gap-1 font-bold no-underline"
          href="/events"
        >
          <TbArrowLeft size={16} /> Event
        </a>
        <Form method="post">
          {createdBy.id === user?.id && (
            <button
              type="submit"
              className="btn-outline btn-warning btn-sm btn flex gap-1"
            >
              <TbTrash size={20} />
            </button>
          )}
        </Form>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex">
          <h1 className="card-title text-2xl">{title}</h1>
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
          <p className="inline-flex items-center gap-1">
            <TbUser size={15} />@{createdBy.username}
          </p>
        </div>
      </div>
      <div className="my-8">
        <h2 className="text-lg font-medium">Icing list</h2>
        <EventIcingItem />
        <EventIcingItem />
        <EventIcingItem />
      </div>

      <StickyButton url={`/events/${id}/new-icing`} color="red" />
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
