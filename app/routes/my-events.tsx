import { Outlet } from "@remix-run/react";
import { TbPlus } from "react-icons/tb";

export default function MyEventsPage() {
  return (
    <div className="min-h-full w-full">
      <div className="relative p-2">
        <Outlet />
        My events
      </div>
      <button className="text-primary-conten btn-circle btn-lg btn bg-primary">
        <TbPlus size={24} />
      </button>
    </div>
  );
}
