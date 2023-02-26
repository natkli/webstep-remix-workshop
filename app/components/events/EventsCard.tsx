import { TbArrowRight } from "react-icons/tb";

import { EventDetails } from "./EventDetails";
import { EventsIcingList } from "./EventsIcingList";

interface IIcingUser {
  name: string | null;
  username: string | null;
  avatarId: string;
}

interface IProps {
  id: string;
  title: string;
  owner: string | null;
  createdAt: string;
  location: string;
  icings: { id: string; winner: IIcingUser; loser: IIcingUser }[];
}

export function EventsCard({
  id,
  title,
  owner,
  createdAt,
  location,
  icings,
}: IProps) {
  return (
    <div className="card mb-4 bg-primary-content shadow-lg">
      <div className="p-6">
        <EventDetails
          title={title}
          owner={owner}
          createdAt={createdAt}
          location={location}
        />

        <EventsIcingList icings={icings} />

        <a
          className="link-primary link flex items-center gap-1 font-bold no-underline"
          href={`/events/${id}`}
        >
          View event <TbArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}
