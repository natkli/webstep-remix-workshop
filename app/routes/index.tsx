import { AuthenticatedFrontPage } from "~/components/frontpage/AuthencatedFrontpage";
import { UnauthenticatedFrontPage } from "~/components/frontpage/UnauthencatedFrontpage";
import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  return (
    <main className="flex h-screen w-screen  items-center justify-center overflow-auto">
      {user ? <AuthenticatedFrontPage /> : <UnauthenticatedFrontPage />}
    </main>
  );
}
