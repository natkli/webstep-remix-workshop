import { useLoaderData } from "@remix-run/react";
import { json, type MetaFunction } from "@remix-run/server-runtime";
import { EventCard } from "~/components/eventCard/EventCard";
import { Frontpage } from "~/components/Frontpage";
import { StickyButton } from "~/components/StickyButton";
import { getEventList } from "~/models/event.server";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Icing",
  };
};

export async function loader() {
  const eventList = await getEventList();
  if (!eventList) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ eventList });
}

export default function Index() {
  const user = useOptionalUser();
  const data = useLoaderData<typeof loader>();

  if (!user) {
    return <Frontpage />;
  }

  return (
    <div className="w-full">
      <h1 className="my-4 text-center text-2xl font-bold">Events</h1>
      <div className="mb-[10rem]">
        {data.eventList.map(
          ({ id, title, location, createdAt, owner, icings }) => {
            return (
              <EventCard
                key={id}
                id={id}
                title={title}
                location={location}
                createdAt={createdAt}
                owner={owner.username}
                icings={icings}
              />
            );
          }
        )}
      </div>
      <StickyButton url="/events/new-event" />
    </div>
  );
}
