import { Form, Link, useActionData } from "@remix-run/react";
import { ActionArgs, json, redirect } from "@remix-run/server-runtime";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { updateUser } from "~/models/user.server";
import { requireUserId } from "~/session.server";

import { useOptionalUser } from "~/utils";

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const username = formData.get("username");
  const name = formData.get("name");

  if (typeof username !== "string" || username.length === 0) {
    return json(
      { errors: { username: "Username is required", name: null } },
      { status: 400 }
    );
  }

  if (typeof name !== "string" || name.length === 0) {
    return json(
      { errors: { username: null, name: "Name is required" } },
      { status: 400 }
    );
  }

  await updateUser({ username, name, userId });

  return redirect(`/profile`);
}

export default function ProfileEditPage() {
  const user = useOptionalUser();

  const actionData = useActionData<typeof action>();
  const usernameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.username) {
      usernameRef.current?.focus();
    } else if (actionData?.errors?.name) {
      nameRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form method="post" className="flex w-full flex-col items-center">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text-alt text-sm">Username</span>
          {actionData?.errors.username && (
            <span className="label-text-alt text-warning">
              {actionData.errors.username}
            </span>
          )}
        </label>
        <input
          type="text"
          name="username"
          ref={usernameRef}
          placeholder={user?.username ? user.username : "Username"}
          className={clsx(
            "input-bordered input w-full max-w-xs",
            actionData?.errors.username && "input-warning"
          )}
        />
      </div>
      <div className="form-control mt-2 w-full max-w-xs">
        <label className="label">
          <span className="label-text-alt text-sm">Name</span>
          {actionData?.errors.name && (
            <span className="label-text-alt text-warning">
              {actionData.errors.name}
            </span>
          )}
        </label>
        <input
          type="text"
          ref={nameRef}
          name="name"
          placeholder={user?.name ? user.name : "Name"}
          className={clsx(
            "input-bordered input w-full max-w-xs",
            actionData?.errors.name && "input-warning"
          )}
        />
      </div>
      <div className="mt-8 flex justify-start gap-4">
        <Link to="/profile" className="btn-outline  btn-secondary btn">
          Cancel
        </Link>
        <button type="submit" className="btn-primary btn">
          Update
        </button>
      </div>
    </Form>
  );
}
