import { HorizontalIcing } from "../icings/HorizontalIcing";

interface IIcing {
  id: string;
  winner: {
    name: string;
    avatarId: string;
    username: string;
  };
  loser: {
    name: string;
    avatarId: string;
    username: string;
  };
}

interface IProps {
  icings: IIcing[];
}

export function EventIcingList({ icings }: IProps) {
  if (icings.length === 0) {
    return (
      <div className="card bg-icing-orange-light p-4 text-center">
        <h2 className="mb-2 text-lg font-medium">Icing begins!</h2>
        <p>Press + to add one</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="mt-4 px-2 text-lg font-bold">Icing list</h2>
      <div className="flex flex-col gap-2 px-2">
        {icings.map(({ id, winner, loser }) => {
          return <HorizontalIcing key={id} winner={winner} loser={loser} />;
        })}
      </div>
    </>
  );
}
