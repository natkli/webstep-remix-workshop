import { Form, Link, useActionData } from "@remix-run/react";
import {
  json,
  redirect,
  type MetaFunction,
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
  return { errors: { username: null, name: null } };
}

export default function ProfileEditPage() {
  const user = useOptionalUser();

  return (
    <Form method="post" className="flex w-full flex-col items-center">
      {/* Legg til username og name input her */}

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
