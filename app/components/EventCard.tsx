import { TbArrowRight, TbCalendarEvent, TbLocation } from "react-icons/tb";
import { formattedDate } from "~/utils";
import { IcingAvatar } from "./IcingAvatar";
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

        <div className="relative mt-4 mb-8 flex items-center gap-3">
          {icings.map(({ id, winner, loser }) => {
            return (
              <div key={id} className="flex gap-3">
                <IcingAvatar
                  name={winner.username || ""}
                  avatarId={winner.avatarId}
                  isWinner
                />
                <IcingAvatar
                  avatarId={loser.avatarId}
                  name={loser.username || ""}
                />
              </div>
            );
          })}

          {icings.length === 0 && (
            <div className="card bg-icing-orange-light px-4 py-2">
              <p>Icing begins ..</p>
            </div>
          )}
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
