import { Form, Outlet } from "@remix-run/react";
import {
  json,
  type MetaFunction,
  type LoaderArgs,
} from "@remix-run/server-runtime";
import clsx from "clsx";
import { TbLogout } from "react-icons/tb";
import avatar1 from "~/images/avatars/avatar1.svg";
import { requireUserId } from "~/session.server";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Icing | My profile",
  };
};

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);
  return json({});
}

export default function ProfilePage() {
  const user = useOptionalUser();

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div>
          <div className="flex flex-col items-center">
            <div className="avatar mt-16 mb-4">
              <div className="w-28 rounded-full bg-neutral-focus text-neutral-content">
                <img
                  src={avatar1}
                  className="bg-neutral-content"
                  alt={`${user?.name} avatar`}
                />
              </div>
            </div>
            <div className="text-center">
              <p
                className={clsx(
                  "text-lg font-bold",
                  !user?.username && "text-base-400"
                )}
              >
                {user?.username || "-"}
              </p>
              <p className={clsx(!user?.name && "text-zinc-400")}>
                {user?.name || "-"}
              </p>
              <p className="mt-2 text-zinc-400">{user?.email}</p>
            </div>

            <div className="mt-8 flex w-full justify-center">
              <Outlet />
            </div>
          </div>
        </div>
        <Form action="/logout" method="post" className="flex justify-center">
          <button type="submit" className="btn-secondary btn mt-[30vh] gap-2">
            <TbLogout size={18} />
            Logout
          </button>
        </Form>
      </div>
    </div>
  );
}
