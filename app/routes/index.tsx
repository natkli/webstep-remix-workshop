import { Link, Outlet } from "@remix-run/react";
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
      <div className="relative h-screen p-4">
        <EventCard />
        <EventCard />
        <div className="z- absolute bottom-20 right-4">
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
