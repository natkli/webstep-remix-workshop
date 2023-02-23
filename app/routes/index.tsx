import { type MetaFunction } from "@remix-run/server-runtime";
import { EventCard } from "~/components/EventCard";
import { Frontpage } from "~/components/Frontpage";
import { StickyButton } from "~/components/StickyButton";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Icing",
  };
};

export default function Index() {
  const user = useOptionalUser();

  if (!user) {
    return <Frontpage />;
  }

  return (
    <div className="w-full">
      <div className="mb-16">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
      <StickyButton url="/events/new-event" />
    </div>
  );
}
