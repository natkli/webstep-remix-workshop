import { TbArrowRight, TbCalendarEvent, TbLocation } from "react-icons/tb";
import { formattedDate } from "~/utils";
import { IcingAvatar } from "./IcingAvatar";

const icingList = [
  {
    name: "jdhx",
    isWinner: true,
  },
  {
    name: "popa",
    isWinner: true,
  },
  {
    name: "joes",
    isWinner: true,
  },
  {
    name: "xsof",
    isWinner: false,
  },
  {
    name: "zozo",
    isWinner: false,
  },
  {
    name: "aesx",
    isWinner: false,
  },
];

interface IProps {
  id: string;
  title: string;
  owner: string | null;
  createdAt: string;
  location: string;
}

export function EventCard({ id, title, owner, createdAt, location }: IProps) {
  return (
    <div className="card mb-4 bg-primary-content shadow-lg">
      <div className="p-4">
        <div className="flex justify-between">
          <h2 className="card-title">{title}</h2>
          <p className="text-icing-red">@{owner}</p>
        </div>
        <div className="mt-2 flex gap-4 text-sm text-base-600">
          <p className="flex items-center gap-1">
            <TbCalendarEvent size={15} />
            {formattedDate(createdAt)}
          </p>
          <p className="inline-flex items-center gap-1">
            <TbLocation size={13} />
            {location}
          </p>
        </div>
        <div className="my-8 flex items-center gap-2">
          {icingList.map(({ name, isWinner }, index) => {
            return <IcingAvatar key={index} name={name} isWinner={isWinner} />;
          })}
        </div>
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
