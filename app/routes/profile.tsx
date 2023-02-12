import { Form, Outlet } from "@remix-run/react";

export default function ProfilePage() {
  return (
    <div className="min-h-full w-full">
      <div className="p-2">
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
