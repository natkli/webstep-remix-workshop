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
} from "react-icons/tb";
import invariant from "tiny-invariant";

import { EventIcingItem } from "~/components/events/eventIcingItem";
import { StickyButton } from "~/components/StickyButton";
import { deleteEvent, getEvent } from "~/models/event.server";
import { requireUserId } from "~/session.server";
import { formattedDate, getAvatarById, useOptionalUser } from "~/utils";

export async function loader({ params }: LoaderArgs) {
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
    <div>
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
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 py-6">
            <div className="avatar">
              <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
                <img
                  src={owner && getAvatarById(owner?.avatarId)}
                  className="bg-neutral-content"
                  alt={`${owner?.name} avatar`}
                />
              </div>
            </div>
            <div>
              <p className="text-md font-medium">{owner.name}</p>
              <span className="text-sm font-normal text-icing-red">
                @{owner.username}
              </span>
            </div>
          </div>
          <h2 className="mt-4 px-2 text-lg font-bold">Icing list</h2>
          <div className="flex flex-col gap-2 px-2">
            {icings.map(({ id, winner, loser }) => {
              return <EventIcingItem key={id} winner={winner} loser={loser} />;
            })}
          </div>
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
