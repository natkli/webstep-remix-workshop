import { useLoaderData } from "@remix-run/react";
import {
  json,
  type LoaderArgs,
  type MetaFunction,
} from "@remix-run/server-runtime";
import { useEffect, useState } from "react";
import { getUsersWithStats } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { getAvatarById } from "~/utils";

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMethod]);

  return (
    <div className="w-full">
      <h1 className="my-4 text-center text-2xl font-bold">Ranking</h1>
      <label className="label">
        <span className="label-text">Sort by</span>
      </label>
      <select
        className="select-bordered select select-md w-full max-w-[7rem]"
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

      <div className="card mt-4 mb-[10rem] bg-primary-content py-6 px-4 shadow-lg">
        {rankingList.map((user, index) => {
          return (
            <div key={index} className="mb-4 w-full">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center justify-center gap-2">
                  <p className="mr-2">#{index + 1}</p>
                  <div className="avatar">
                    <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
                      <img
                        src={user && getAvatarById(user?.avatarId)}
                        className="bg-neutral-content"
                        alt={`${user?.name} avatar`}
                      />
                    </div>
                  </div>
                  <div>
                    <p>{user.name}</p>
                    <p className="text-icing-red">@{user.username}</p>
                  </div>
                </div>

                <div className="flex flex-row gap-4">
                  <div className="flex flex-row">
                    <p className="flex gap-1">
                      {user.icingWins.length}
                      <span className="text-green-500">W</span>
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <p className="flex gap-1">
                      {user.icingLoses.length}
                      <span className="text-red-500">L</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
