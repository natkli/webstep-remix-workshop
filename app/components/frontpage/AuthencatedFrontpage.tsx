import { useOptionalUser } from "~/utils";

export function AuthenticatedFrontPage() {
  const user = useOptionalUser();

  console.log(user);
  return <div className="flex flex-col items-center">authenticated</div>;
}
