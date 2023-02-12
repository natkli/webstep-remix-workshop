import { Link } from "@remix-run/react";
import undrawEnegizer from "~/images/undraw_energizer.svg";

export function UnauthenticatedFrontPage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="relative block w-full text-center text-6xl font-black tracking-tight">
        ICE
        <span className="absolute top-8 right-6 rotate-[20deg] text-4xl">
          ICE
        </span>
        <span className="absolute top-8 left-6 -rotate-[20deg] text-4xl">
          ICE
        </span>
      </h1>
      <img className="mt-24 mb-8 w-[80vw]" src={undrawEnegizer} />
      <div className="mx-auto mt-10 flex w-full justify-center">
        <div className="mx-auto inline-grid grid-cols-2 gap-5 space-y-0">
          <Link to="/signup" className="btn-sedondary btn-outline btn">
            Sign up
          </Link>
          <Link to="/login" className="btn-primary btn">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
