import { Outlet } from "@remix-run/react";
import { MetaFunction } from "@remix-run/server-runtime";
import { Frontpage } from "~/components/Frontpage";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Icing",
  };
};


export default function Index() {
  const user = useOptionalUser();

  if (!user) {
    return <Frontpage />;
  }

  return (
    <div className="min-h-full w-full">
      <div className="p-4">
        <Outlet />
        Home
      </div>
    </div>
  );
}
