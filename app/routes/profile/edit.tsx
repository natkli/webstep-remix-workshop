import { Form, Link } from "@remix-run/react";

export default function ProfileEditPage() {
  return (
    <Form
      action="save"
      method="post"
      className="flex w-full flex-col items-center"
    >
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text-alt text-sm">Username</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input-bordered input w-full max-w-xs"
        />
      </div>
      <div className="form-control mt-2 w-full max-w-xs">
        <label className="label">
          <span className="label-text-alt text-sm">Name</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input-bordered input w-full max-w-xs"
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
