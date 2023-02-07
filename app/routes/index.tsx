import { Link } from "@remix-run/react";
import undrawEnegizer from "../images/undraw_energizer.svg";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  return (
    <main className="flex h-screen w-screen  items-center justify-center overflow-auto">
      <div className="flex flex-col items-center">
        <h1 className="relative block w-full text-center text-6xl font-black tracking-tight sm:text-8xl lg:text-9xl">
          ICE
          <span className="absolute top-8 right-6 rotate-[20deg] text-4xl lg:top-14 lg:-right-32 lg:text-8xl ">
            ICE
          </span>
          <span className="absolute top-8 left-6 -rotate-[20deg] text-4xl lg:-left-20 lg:top-14 lg:text-7xl">
            ICE
          </span>
        </h1>
        <img className="mt-20 mb-6 w-[80vw] lg:w-[30vw]" src={undrawEnegizer} />
        <div className="mx-auto mt-10 flex w-full justify-center">
          {user ? (
            <Link to="/notes" className="btn-primary btn">
              View Notes for {user.email}
            </Link>
          ) : (
            <div className="mx-auto inline-grid grid-cols-2 gap-5 space-y-0">
              <Link to="/signup" className="btn-sedondary btn-outline btn">
                Sign up
              </Link>
              <Link to="/login" className="btn-primary btn">
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
