import { Link } from "@remix-run/react";

export default function ProfileIndexPage() {
  return (
    <Link to="edit" className="btn-outline btn-primary btn">
      Edit profile
    </Link>
  );
}
