import { Form, Outlet } from "@remix-run/react";

export default function ProfilePage() {
  return (
    <div className="relative grid min-h-full p-2">
      <Outlet />
      Profile
      <Form action="/logout" method="post">
        <button type="submit" className="btn-primary btn">
          Logout
        </button>
      </Form>
    </div>
  );
}
