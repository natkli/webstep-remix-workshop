import { Form, Outlet } from "@remix-run/react";
import { json, type LoaderArgs } from "@remix-run/server-runtime";
import { TbLogout } from "react-icons/tb";
import aliciaDickerson from "~/images/avatars/alicia-dickerson.svg";
import { requireUserId } from "~/session.server";

import { useOptionalUser } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);
  return json({});
}

export default function ProfilePage() {
  const user = useOptionalUser();

  return (
    <div className="min-h-full w-full">
      <div className="flex h-[90vh] flex-col justify-between p-4">
        <div>
          <div className="flex flex-col items-center">
            <div className="avatar mt-16 mb-4">
              <div className="w-28 rounded-full bg-neutral-focus text-neutral-content">
                <img src={aliciaDickerson} className="bg-neutral-content" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">jdxe</p>
              <p>John Doe</p>
              <p className="mt-2 text-zinc-400">{user?.email}</p>
            </div>

            <div className="mt-8 flex w-full justify-center">
              <Outlet />
            </div>
          </div>
        </div>

        <Form action="/logout" method="post" className="flex justify-center">
          <button type="submit" className="btn-secondary btn gap-2">
            <TbLogout size={18} />
            Logout
          </button>
        </Form>
      </div>
    </div>
  );
}
