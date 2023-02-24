import { getAvatarById } from "~/utils";
interface IProps {
  name: string;
  avatarId: string;
  isWinner?: boolean;
}

export function IcingAvatar({ name, avatarId, isWinner }: IProps) {
  return (
    <div className="flex flex-col items-center">
      {isWinner ? (
        <p className="font-medium text-green-500">W</p>
      ) : (
        <p className="font-medium text-red-500">L</p>
      )}
      <div className="avatar relative my-1">
        <div className="w-10">
          <img src={getAvatarById(avatarId)} alt="avatar" />
        </div>
      </div>
      <p className="text-sm">{name}</p>
    </div>
  );
}
