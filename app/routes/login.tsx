import { useEffect, useRef } from "react";

import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";

import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";
import clsx from "clsx";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/¨");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
}

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Form method="post" className="w-[20rem] max-w-lg space-y-6">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text-alt text-sm">Email</span>
            {actionData?.errors.email && (
              <span className="label-text-alt text-error">
                {actionData.errors.email}
              </span>
            )}
          </label>
          <input
            type="text"
            name="email"
            ref={emailRef}
            className={clsx(
              "input-bordered input w-full max-w-xs",
              actionData?.errors.email && "input-error"
            )}
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text-alt text-sm">Password</span>
            {actionData?.errors.password && (
              <span className="label-text-alt text-error">
                {actionData.errors.password}
              </span>
            )}
          </label>
          <input
            name="password"
            type="password"
            ref={passwordRef}
            className={clsx(
              "input-bordered input w-full max-w-xs",
              actionData?.errors.password && "input-warning"
            )}
          />
        </div>

        <input type="hidden" name="redirectTo" value={redirectTo} />

        <button type="submit" className="btn-primary btn w-full">
          Log in
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="checkbox-primary checkbox"
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>
          <div className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              className="link-primary link"
              to={{
                pathname: "/signup",
                search: searchParams.toString(),
              }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}
