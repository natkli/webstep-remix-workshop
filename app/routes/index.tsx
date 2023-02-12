import { AuthenticatedFrontPage } from "~/components/frontpage/AuthencatedFrontpage";
import { UnauthenticatedFrontPage } from "~/components/frontpage/UnauthencatedFrontpage";
import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  return (
    <div>
      {user ? <AuthenticatedFrontPage /> : <UnauthenticatedFrontPage />}
    </div>
  );
}
