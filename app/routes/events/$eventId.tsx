import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getEvent } from "~/models/event.server";

import { requireUserId } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.eventId, "eventId not found");

  const event = await getEvent({ userId, id: params.eventId });
  if (!event) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ event });
}

export default function EventDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.event.id}</h3>
      <p>{data.event.title}</p>
      <p>{data.event.location}</p>
      <Form method="post">
        <button type="submit" className="btn-primary btn">
          Delete
        </button>
      </Form>
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
