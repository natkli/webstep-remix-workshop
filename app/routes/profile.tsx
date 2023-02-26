import { Form, Outlet } from "@remix-run/react";
import {
  json,
  type LoaderArgs,
  type MetaFunction,
} from "@remix-run/server-runtime";
import { TbLogout } from "react-icons/tb";
import { ProfileAvatar } from "~/components/avatar/ProfileAvatar";
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
        <h1 className="my-4 text-center text-2xl font-bold">Profile</h1>

        {user && (
          <div className="flex flex-col items-center">
            <ProfileAvatar name={user.name} avatarId={user.avatarId} />
            <div className="text-center">
              <p className="text-lg font-bold">{user?.username}</p>
              <p>{user?.name}</p>
              <p className="mt-2 text-zinc-400">{user?.email}</p>
            </div>
          </div>
        )}

        <div className="mt-8 flex w-full justify-center">
          <Outlet />
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
