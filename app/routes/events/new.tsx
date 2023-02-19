import { Link } from "@remix-run/react";
import {
  json,
  type LoaderArgs,
  type MetaFunction,
} from "@remix-run/server-runtime";
import { requireUserId } from "~/session.server";

export const meta: MetaFunction = () => {
  return {
    title: "Icing | New event",
  };
};

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);
  return json({});
}

export default function NewEventPage() {
  return (
    <div className="min-h-full w-full">
      <div className="p-4">
        <h1> new event</h1>

        <div className="flex gap-2">
          <Link to="/">
            <button className="btn-outline btn">Back</button>
          </Link>
          <Link to="/">
            <button className="btn">Create event</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
