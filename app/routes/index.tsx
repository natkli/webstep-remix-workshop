import { Outlet } from "@remix-run/react";
import { Frontpage } from "~/components/Frontpage";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  if (!user) {
    return <Frontpage />;
  }

  return (
    <div className="min-h-full w-full">
      <div className="p-2">
        <Outlet />
        Home
      </div>
    </div>
  );
}
