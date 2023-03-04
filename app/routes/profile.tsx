import { Form, Outlet } from "@remix-run/react";
import {
  json,
  type LoaderArgs,
  type MetaFunction,
} from "@remix-run/server-runtime";
import { TbLogout } from "react-icons/tb";

import { requireUserId } from "~/session.server";
import { getAvatarById, useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Icing | Profile",
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
      <h1 className="my-4 text-center text-2xl font-bold">Profile</h1>
      <div className="flex flex-col">
        {user && (
          <div className="flex flex-col items-center">
            <div className="avatar mt-8 mb-4">
              <div className="w-28 rounded-full bg-neutral-focus text-neutral-content">
                <img
                  src={getAvatarById(user.avatarId)}
                  className="bg-neutral-content"
                  alt={`${user.name} avatar`}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-icing-orange">
                @{user?.username}
              </p>
              <p>{user?.name}</p>
              <p className="mt-2 text-zinc-400">{user?.email}</p>
            </div>
          </div>
        )}

        {/* Outlet */}
        <div className="mt-8 flex w-full justify-center">
          <Outlet />
        </div>

        <Form action="/logout" method="post" className="flex justify-center">
          <button type="submit" className="btn-secondary btn my-[20vh] gap-2">
            <TbLogout size={18} />
            Logout
          </button>
        </Form>
      </div>
    </div>
  );
}
