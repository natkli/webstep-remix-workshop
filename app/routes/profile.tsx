import { Form, Outlet } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import { requireUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);
  return json({});
}

export default function ProfilePage() {
  return (
    <div className="min-h-full w-full">
      <div className="p-4">
        <Outlet />
        Profile
        <Form action="/logout" method="post">
          <button type="submit" className="btn-primary btn">
            Logout
          </button>
        </Form>
      </div>
    </div>
  );
}
