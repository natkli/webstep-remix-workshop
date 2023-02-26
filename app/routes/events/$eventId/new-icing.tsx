import { useEffect, useRef } from "react";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import {
  json,
  redirect,
  type ActionArgs,
  type MetaFunction,
} from "@remix-run/server-runtime";
import invariant from "tiny-invariant";

import { UserSelect } from "~/components/UserSelect";

import { createIcing } from "~/models/icing.server";
import { getUsers } from "~/models/user.server";
import { requireUserId } from "~/session.server";

export const meta: MetaFunction = () => {
  return {
    title: "Icing | Add new icing",
  };
};

export async function loader({ params }: ActionArgs) {
  invariant(params.eventId, "eventId not found");

  const users = await getUsers();
  const eventId = params.eventId;

  if (!users) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ users, eventId });
}

export async function action({ request, params }: ActionArgs) {
  const userId = await requireUserId(request);

  invariant(params.eventId, "eventId not found");

  const formData = await request.formData();
  const winnerId = formData.get("winner") as string;
  const loserId = formData.get("loser") as string;

  if (winnerId === loserId) {
    return json(
      { error: "Winner and loser can't be the same person" },
      { status: 400 }
    );
  }

  await createIcing(params.eventId, winnerId, loserId, userId);

  return redirect(`/events/${params.eventId}`);
}

export default function EventIdNewIcing() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const winnerRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (actionData?.error) {
      winnerRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="min-h-full w-full">
      <h1 className="my-4 text-center text-2xl font-bold">Add new Icing</h1>
      <Form method="post" className="flex w-full flex-col items-center">
        <UserSelect
          ref={winnerRef}
          label="Winner"
          name="winner"
          users={data.users}
          error={!!actionData?.error}
        />

        <UserSelect
          label="Loser"
          name="loser"
          users={data.users}
          error={!!actionData?.error}
        />

        {actionData?.error && (
          <p className="mt-4 font-medium text-error">* {actionData.error}</p>
        )}

        <div className="mt-8 flex justify-start gap-4">
          <Link
            to={`/events/${data.eventId}`}
            className="btn-outline  btn-secondary btn"
          >
            Cancel
          </Link>
          <button type="submit" className="btn-primary btn">
            Add new
          </button>
        </div>
      </Form>
    </div>
  );
}
