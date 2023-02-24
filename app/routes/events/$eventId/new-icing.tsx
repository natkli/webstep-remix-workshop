import { Form, Link, useLoaderData } from "@remix-run/react";
import {
  json,
  redirect,
  type ActionArgs,
  type MetaFunction,
} from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
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
      { errors: "Winner and loser can't be the same person" },
      { status: 400 }
    );
  }

  await createIcing(params.eventId, winnerId, loserId, userId);

  return redirect(`/events/${params.eventId}`);
}

export default function EventIdNewIcing() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="min-h-full w-full">
      <h1 className="my-4 text-center text-2xl font-bold">New Icing</h1>
      <Form method="post" className="flex w-full flex-col items-center">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text-alt text-sm">Winner</span>
          </label>
          <select
            className="select-bordered select"
            name="winner"
            defaultValue={data.users[0].id}
          >
            {data.users.map(({ id, name, username }) => {
              return (
                <option key={id} value={id}>
                  {name} @{username}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-control mt-2 w-full max-w-xs">
          <label className="label">
            <span className="label-text-alt text-sm">Loser</span>
          </label>
          <select
            className="select-bordered select"
            name="loser"
            defaultValue={data.users[0].id}
          >
            {data.users.map(({ id, name, username }) => {
              return (
                <option key={id} value={id}>
                  {name} @{username}
                </option>
              );
            })}
          </select>
        </div>
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
