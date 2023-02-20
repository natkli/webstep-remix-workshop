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
      <div className="relative">
        <div className="fixed bottom-0 w-full max-w-[30rem]">
          <div className="bordered relative flex flex-row-reverse">
            <Link
              to="/events/new"
              className="absolute bottom-20 right-8 z-50 md:right-0"
            >
              <button className="btn-circle btn-lg btn">
                <TbPlus size={26} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
