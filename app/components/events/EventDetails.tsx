import { TbCalendarEvent, TbLocation } from "react-icons/tb";

import { formattedDate } from "~/utils";

interface IProps {
  title: string;
  owner: string | null;
  createdAt: string;
  location: string;
}

export function EventDetails({ title, owner, createdAt, location }: IProps) {
  return (
    <>
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
    </>
  );
}
