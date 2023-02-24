import { useLoaderData } from "@remix-run/react";
import { json, type MetaFunction } from "@remix-run/server-runtime";
import { EventCard } from "~/components/EventCard";
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
    <div className="w-full ">
      <div className="mb-16 ">
        {data.eventList.map(({ id, title, location, createdAt, creator }) => {
          return (
            <EventCard
              key={id}
              id={id}
              title={title}
              location={location}
              createdAt={createdAt}
              creatorUsername={creator.username}
            />
          );
        })}
      </div>
      <StickyButton url="/events/new-event" />
    </div>
  );
}
