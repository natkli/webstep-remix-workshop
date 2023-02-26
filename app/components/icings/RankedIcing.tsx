import { getAvatarById } from "~/utils";

interface IProps {
  username: string;
  name: string;
  avatarId: string;
  rank: number;
  icingWins: number;
  icingLoses: number;
}

export function RankedIcing({
  name,
  username,
  avatarId,
  rank,
  icingWins,
  icingLoses,
}: IProps) {
  return (
    <div key={rank} className="mb-4 w-full">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center justify-center gap-3">
          <p className="w-6 text-right text-neutral-400">#{rank}</p>
          <div className="avatar">
            <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
              <img
                src={getAvatarById(avatarId)}
                className="bg-neutral-content"
                alt={`${name} avatar`}
              />
            </div>
          </div>
          <div>
            <p>{name}</p>
            <p className="text-sm">@{username}</p>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex flex-row">
            <p className="flex gap-1">
              {icingWins}
              <span className="text-green-500">W</span>
            </p>
          </div>
          <div className="flex flex-row">
            <p className="flex gap-1">
              {icingLoses}
              <span className="text-red-500">L</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
