import {
  json,
  redirect,
  type ActionArgs,
  type LoaderArgs,
} from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import { TbArrowLeft, TbTrash } from "react-icons/tb";
import invariant from "tiny-invariant";

import { EventDetails } from "~/components/event/EventDetails";
import { EventIcingList } from "~/components/event/EventIcingList";
import { StickyButton } from "~/components/StickyButton";

import { deleteEvent, getEvent } from "~/models/event.server";
import { requireUserId } from "~/session.server";
import { useOptionalUser } from "~/utils";

export async function loader({ params, request }: LoaderArgs) {
  await requireUserId(request);
  invariant(params.eventId, "eventId not found");

  const event = await getEvent(params.eventId);

  if (!event) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ event });
}

export async function action({ request, params }: ActionArgs) {
  const userId = await requireUserId(request);
  invariant(params.eventId, "eventId not found");

  await deleteEvent(params.eventId, userId);
  return redirect("/");
}

export default function EventDetailsPage() {
  const user = useOptionalUser();
  const data = useLoaderData<typeof loader>();
  const { id, title, location, owner, createdAt, icings } = data.event;

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between">
        <a
          className="link-primary link flex items-center gap-1 text-xl font-bold no-underline"
          href="/events"
        >
          <TbArrowLeft size={16} /> Events
        </a>
        <Form method="post">
          {owner.id === user?.id && (
            <button
              type="submit"
              className="btn-warning btn-ghost btn-sm btn flex gap-1 text-icing-red"
            >
              <TbTrash size={20} />
            </button>
          )}
        </Form>
      </div>

      <div className="card mb-[10rem] bg-primary-content px-4 py-8 shadow-lg">
        <div className="flex flex-col">
          <EventDetails
            title={title}
            location={location}
            owner={owner}
            createdAt={createdAt}
          />

          <EventIcingList icings={icings} />
        </div>
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
