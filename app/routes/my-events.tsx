import { Outlet } from "@remix-run/react";
import { TbPlus } from "react-icons/tb";

export default function MyEventsPage() {
  return (
    <div className="relative grid min-h-full p-2">
      <Outlet />
      My events
      <button className="text-primary-conten btn-circle btn-lg btn fixed bottom-20 right-4 z-30 flex bg-primary">
        <TbPlus size={24} />
      </button>
    </div>
  );
}
