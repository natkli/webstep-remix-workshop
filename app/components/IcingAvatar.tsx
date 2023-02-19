import { TbSword, TbTargetOff } from "react-icons/tb";
import aliciaDickerson from "~/images/avatars/alicia-dickerson.svg";

interface IProps {
  name: string;
  isWinner: boolean;
}

export function IcingAvatar({ name, isWinner }: IProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="avatar relative mb-1">
        <div className="w-10">
          <img src={aliciaDickerson} alt="avatar" />
        </div>
        <div className="absolute top-1/2 left-1/2 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black opacity-10"></div>
        {isWinner ? (
          <TbSword
            size={22}
            className="absolute top-1/2 left-1/2 w-10 -translate-x-1/2 -translate-y-1/2 transform text-white "
          />
        ) : (
          <TbTargetOff
            size={22}
            className="absolute top-1/2 left-1/2 w-10 -translate-x-1/2 -translate-y-1/2 transform text-white "
          />
        )}
      </div>
      <p className="text-xs">{name}</p>
    </div>
  );
}
