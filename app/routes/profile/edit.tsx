import { Form, Link, useActionData } from "@remix-run/react";
import {
  json,
  MetaFunction,
  redirect,
  type ActionArgs,
} from "@remix-run/server-runtime";
import { useEffect, useRef } from "react";
import { TextInput } from "~/components/TextInput";
import { updateUser } from "~/models/user.server";
import { requireUserId } from "~/session.server";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Icing | Edit profile",
  };
};

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

  if (typeof username !== "string" || username.length !== 4) {
    return json(
      {
        errors: {
          username: "Username must be 4 characters",
          name: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof name !== "string" || name.length === 0) {
    return json(
      { errors: { username: null, name: "Name is required" } },
      { status: 400 }
    );
  }

  await updateUser(userId, username, name);

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
      <TextInput
        label="Username"
        name="username"
        ref={usernameRef}
        placeholder={user?.username}
        error={actionData?.errors.username}
      />

      <TextInput
        label="Name"
        name="name"
        ref={nameRef}
        placeholder={user?.name}
        error={actionData?.errors.name}
      />

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
