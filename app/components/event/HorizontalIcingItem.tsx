import { getAvatarById } from "~/utils";
interface IIcingUser {
  name: string | null;
  username: string | null;
  avatarId: string;
}
interface IProps {
  winner: IIcingUser;
  loser: IIcingUser;
}

export function HorizontalIcingItem({ winner, loser }: IProps) {
  return (
    <div className="event-icing-item mt-4 flex flex-col gap-2 bg-primary-content">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <div className="avatar relative">
            <div className="w-10">
              <img src={getAvatarById(winner.avatarId)} alt="avatar" />
            </div>
          </div>
          <p className="text-md flex flex-col font-bold">
            {winner.name}
            <span className="text-xs font-light text-icing-red">
              @{winner.username}
            </span>
          </p>
        </div>
        <p className="w-5 text-center text-lg font-medium text-green-500">W</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <div className="avatar relative">
            <div className="w-10">
              <img src={getAvatarById(loser.avatarId)} alt="avatar" />
            </div>
          </div>
          <p className="text-md flex flex-col font-bold">
            {loser.name}
            <span className="text-xs font-light text-icing-red">
              @{loser.username}
            </span>
          </p>
        </div>
        <p className="w-5 text-center text-lg font-medium text-red-500">L</p>
      </div>
    </div>
  );
}
