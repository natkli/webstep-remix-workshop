import { TbArrowRight, TbCalendarEvent, TbLocation } from "react-icons/tb";
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

export function EventCard() {
  return (
    <div className="mb-4">
      <div className="border border-primary p-4">
        <div className="flex justify-between">
          <h2 className="card-title">Hemsedal Icing</h2>
          <p className="text-icing-red">@jnhx</p>
        </div>
        <div className="flex gap-4 text-sm text-base-600">
          <p className="flex items-center gap-1">
            <TbCalendarEvent size={18} />
            17.jan.23
          </p>
          <p className="inline-flex items-center text-sm ">
            <TbLocation size={16} className="mr-1" />
            Hemsedal
          </p>
        </div>
        <div className="my-6 flex items-center gap-2">
          {icingList.map(({ name, isWinner }) => {
            return (
              <>
                <IcingAvatar name={name} isWinner={isWinner} />
              </>
            );
          })}
        </div>
        <a
          className="link-primary link flex items-center font-bold no-underline"
          href=""
        >
          View event <TbArrowRight className="ml-1" size={16} />
        </a>
      </div>
    </div>
  );
}
