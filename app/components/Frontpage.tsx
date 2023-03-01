import { Link } from "@remix-run/react";
import clsx from "clsx";
import { useState } from "react";
import undrawEnegizer from "~/images/undraw_energizer.svg";

export function Frontpage() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1
        className="relative mb-8 text-center text-6xl font-black tracking-tight"
        onClick={() => setShowEasterEgg(!showEasterEgg)}
      >
        ICE
        <span className="absolute -left-24 top-8 -rotate-[20deg] text-4xl">
          ICE
        </span>
        <span className="absolute top-8 -right-24 rotate-[20deg] text-4xl">
          ICE
        </span>
        <span
          className={clsx(
            "absolute top-20 right-0 text-4xl transition duration-200 ease-in-out",
            showEasterEgg ? "opacity-100" : "opacity-0"
          )}
        >
          BABY
        </span>
      </h1>

      <img
        className="mt-24 mb-8 max-h-[25rem] w-[80vw]"
        src={undrawEnegizer}
        alt="drink illustration"
      />
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
