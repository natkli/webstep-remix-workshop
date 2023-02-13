import { Outlet } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import { requireUserId } from "~/session.server";

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
