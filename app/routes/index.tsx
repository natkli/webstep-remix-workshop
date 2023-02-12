import { Form, Outlet } from "@remix-run/react";
import { TbPlus } from "react-icons/tb";
import { UnauthenticatedFrontPage } from "~/components/frontpage/UnauthencatedFrontpage";
import Menu from "~/components/menu/Menu";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  if (!user) {
    return <UnauthenticatedFrontPage />;
  }

  return (
    <div className="relative grid min-h-full p-2">
      <Outlet />
      Home
    </div>
  );
}
