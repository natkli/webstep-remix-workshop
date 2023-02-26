import { useEffect, useRef } from "react";

import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";

import { createUserSession, getUserId } from "~/session.server";

import { TextInput } from "~/components/TextInput";
import { createUser, getUserByEmail } from "~/models/user.server";
import { safeRedirect, validateEmail } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const name = formData.get("name");
  const username = formData.get("username");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateEmail(email)) {
    return json(
      {
        errors: {
          email: "Email is invalid",
          username: null,
          name: null,
          password: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof username !== "string" || username.length === 0) {
    return json(
      {
        errors: {
          email: null,
          username: "Username title is required",
          name: null,
          password: null,
        },
      },
      { status: 400 }
    );
  }

  if (username.length !== 4) {
    return json(
      {
        errors: {
          email: null,
          username: "Username must be 4 characters",
          name: null,
          password: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof name !== "string" || name.length === 0) {
    return json(
      {
        errors: {
          email: null,
          username: null,
          name: "Name is required",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      {
        errors: {
          email: null,
          username: null,
          name: null,
          password: "Password is required",
        },
      },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      {
        errors: {
          email: null,
          username: null,
          name: null,
          password: "Password is too short",
        },
      },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          username: null,
          name: null,
          password: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(email, username, name, password);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
}

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.username) {
      usernameRef.current?.focus();
    } else if (actionData?.errors?.name) {
      nameRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex h-screen  flex-col items-center justify-center">
      <Form method="post" className="w-[20rem] max-w-lg space-y-6">
        <TextInput
          label="Email address"
          name="email"
          ref={emailRef}
          error={actionData?.errors.email}
        />

        <TextInput
          label="Username"
          name="username"
          ref={usernameRef}
          error={actionData?.errors.username}
        />

        <TextInput
          label="Name"
          name="name"
          ref={usernameRef}
          error={actionData?.errors.name}
        />

        <TextInput
          label="Password"
          name="password"
          type="password"
          ref={usernameRef}
          error={actionData?.errors.password}
        />

        <input type="hidden" name="redirectTo" value={redirectTo} />
        <button type="submit" className="btn-primary btn w-full">
          Create Account
        </button>
        <div className="flex items-center justify-center">
          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              className="link-primary link"
              to={{
                pathname: "/login",
                search: searchParams.toString(),
              }}
            >
              Log in
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}
