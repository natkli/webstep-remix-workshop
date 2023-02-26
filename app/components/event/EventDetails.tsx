import { TbCalendarEvent, TbLocation } from "react-icons/tb";

import { formattedDate, getAvatarById } from "~/utils";

interface IOwner {
  avatarId: string;
  name: string;
  username: string;
}

interface IProps {
  title: string;
  location: string;
  owner: IOwner;
  createdAt: string;
}

export function EventDetails({ title, location, owner, createdAt }: IProps) {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex">
          <h1 className="card-title text-2xl">{title}</h1>
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
      </div>
      <div className="flex items-center justify-center gap-2 py-6">
        <div className="avatar">
          <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
            <img
              src={owner && getAvatarById(owner?.avatarId)}
              className="bg-neutral-content"
              alt={`${owner?.name} avatar`}
            />
          </div>
        </div>
        <div>
          <p className="text-md font-medium">{owner.name}</p>
          <span className="text-sm font-normal text-icing-red">
            @{owner.username}
          </span>
        </div>
      </div>
    </>
  );
}
