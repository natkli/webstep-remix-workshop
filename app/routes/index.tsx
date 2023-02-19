import { Link } from "@remix-run/react";
import { type MetaFunction } from "@remix-run/server-runtime";
import { TbPlus } from "react-icons/tb";
import { EventCard } from "~/components/EventCard";
import { Frontpage } from "~/components/Frontpage";

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
    <div className="min-h-full w-full">
      <div className="relative h-screen">
        <EventCard />
        <EventCard />
        <div className="absolute bottom-24 right-0 z-50">
          <Link to="/events/new">
            <button className="btn-circle btn-lg btn">
              <TbPlus size={26} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
