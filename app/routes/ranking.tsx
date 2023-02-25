import { useLoaderData } from "@remix-run/react";
import {
  json,
  type LoaderArgs,
  type MetaFunction,
} from "@remix-run/server-runtime";
import { useEffect, useState } from "react";
import { getUsersWithStats } from "~/models/user.server";
import { requireUserId } from "~/session.server";

export const meta: MetaFunction = () => {
  return {
    title: "Icing | Ranking",
  };
};

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);

  const users = await getUsersWithStats();

  if (!users) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ users });
}

type SortMethod = "name" | "wins" | "loses";
interface IUserWithStats {
  id: string;
  name: string;
  username: string;
  avatarId: string;
  icingWins: [];
  icingLoses: [];
}

export default function RankingPage() {
  const data = useLoaderData<typeof loader>();

  const [sortMethod, setSortMethod] = useState<SortMethod>("wins");
  const [rankingList, setRankingList] = useState(
    data.users as IUserWithStats[]
  );

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

    //eslint-ignore
  }, [sortMethod]);

  return (
    <div className="w-full">
      <h1 className="mb-4 text-xl font-bold">Ranking</h1>

      <select
        className="select-bordered select w-full max-w-xs"
        onChange={(event) => {
          const value = event.target.value as SortMethod;
          setSortMethod(value);
        }}
        defaultValue="wins"
      >
        <option value="wins">Sort by Wins</option>
        <option value="loses">Sort by Loses</option>
        <option value="name">Sort by Name</option>
      </select>

      {rankingList.map((ranking, index) => {
        return <div key={index}>{ranking.name}</div>;
      })}
    </div>
  );
}
