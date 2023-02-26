import { useLoaderData } from "@remix-run/react";
import {
  json,
  type LoaderArgs,
  type MetaFunction,
} from "@remix-run/server-runtime";
import { useEffect, useState } from "react";
import { RankedIcing } from "~/components/icings/RankedIcing";

import { getUsersRank } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { getAvatarById } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Icing | Ranking",
  };
};

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);

  const users = await getUsersRank();

  if (!users) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ users });
}

type SortMethod = "name" | "wins" | "loses";

export default function RankingPage() {
  const data = useLoaderData<typeof loader>();

  const [sortMethod, setSortMethod] = useState<SortMethod>("wins");
  const [rankingList, setRankingList] = useState(data.users);

  useEffect(() => {
    if (sortMethod === "wins") {
      const sortedByWins = [...rankingList].sort(
        (a, b) => b.icingWins.length - a.icingWins.length
      );

      setRankingList(sortedByWins);
      return;
    }

    if (sortMethod === "loses") {
      const sortedByLoses = [...rankingList].sort(
        (a, b) => b.icingLoses.length - a.icingLoses.length
      );

      setRankingList(sortedByLoses);
      return;
    }

    if (sortMethod === "name") {
      const sortedByName = [...rankingList].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setRankingList(sortedByName);
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMethod]);

  return (
    <div className="w-full">
      <h1 className="my-4 text-center text-2xl font-bold">Ranking</h1>
      <div className="flex w-full justify-center">
        <div>
          <label className="label">
            <span className="label-text w-full text-center">Sort by</span>
          </label>
          <select
            className="select-bordered select select-md w-full"
            onChange={(event) => {
              const value = event.target.value as SortMethod;
              setSortMethod(value);
            }}
            defaultValue="wins"
          >
            <option value="wins">Wins</option>
            <option value="loses">Loses</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="card mt-4 mb-[10rem] bg-primary-content py-6 px-4 shadow-lg">
        {rankingList.map(
          ({ name, username, avatarId, icingWins, icingLoses }, index) => {
            return (
              <RankedIcing
                key={index}
                rank={index + 1}
                name={name}
                avatarId={avatarId}
                username={username}
                icingWins={icingWins.length}
                icingLoses={icingLoses.length}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
