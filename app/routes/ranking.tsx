import { Outlet } from "@remix-run/react";
import {
  json,
  type MetaFunction,
  type LoaderArgs,
} from "@remix-run/server-runtime";
import { requireUserId } from "~/session.server";

export const meta: MetaFunction = () => {
  return {
    title: "Icing | Ranking",
  };
};

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);
  return json({});
}

export default function RankingPage() {
  return (
    <div className="w-full">
      <h1 className="mb-4 text-xl font-bold">Ranking</h1>
    </div>
  );
}
