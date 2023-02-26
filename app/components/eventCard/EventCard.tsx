import { TbArrowRight, TbCalendarEvent, TbLocation } from "react-icons/tb";
import { IcingAvatar } from "../IcingAvatar";

import { formattedDate } from "~/utils";
import { EventCardHeader } from "./EventCardHeader";
import { EventCardIcingList } from "./EventCardIcingList";

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

export function EventCard({
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
        <EventCardHeader
          title={title}
          owner={owner}
          createdAt={createdAt}
          location={location}
        />

        <EventCardIcingList icings={icings} />

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
