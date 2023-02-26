import { IcingAvatar } from "../IcingAvatar";

interface IIcingUser {
  name: string | null;
  username: string | null;
  avatarId: string;
}

interface IProps {
  icings: { id: string; winner: IIcingUser; loser: IIcingUser }[];
}

export function EventCardIcingList({ icings }: IProps) {
  return (
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
  );
}
