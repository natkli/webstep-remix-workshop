import { Outlet } from "@remix-run/react";

export default function RankingPage() {
  return (
    <div className="relative grid min-h-full p-2">
      <Outlet />
      Ranking
    </div>
  );
}
