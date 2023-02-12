import { Outlet } from "@remix-run/react";

export default function RankingPage() {
  return (
    <div className="min-h-full w-full">
      <div className="p-2">
        <Outlet />
        Ranking
      </div>
    </div>
  );
}
