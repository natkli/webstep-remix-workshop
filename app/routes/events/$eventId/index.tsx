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

import { getEvent } from "~/models/event.server";
import { requireUserId } from "~/session.server";

import undrawPageNotFound from "~/images/undraw_page_not_found.svg";

// Oppgave 5.1 og 5.2
export async function loader({ params, request }: LoaderArgs) {
  console.log(params.eventId);
  return json({});
}

export default function EventDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return <div></div>;
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div>
        <a
          className="link-primary link flex items-center gap-1 text-xl font-bold no-underline"
          href="/events"
        >
          <TbArrowLeft size={16} /> Events
        </a>
        <div className="flex flex-col items-center justify-center px-8">
          <img
            className="mt-[15vh] max-h-[25rem] w-full"
            src={undrawPageNotFound}
            alt="drink illustration"
          />
          <h1 className="mt-12 text-2xl font-black">Event not found</h1>
        </div>
      </div>
    );
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
