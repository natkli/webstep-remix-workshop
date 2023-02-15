import { Outlet } from "@remix-run/react";
import { json, MetaFunction, type LoaderArgs } from "@remix-run/server-runtime";
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
    <div className="min-h-full w-full">
      <div className="p-4">
        <Outlet />
        Ranking
      </div>
    </div>
  );
}
