import { useOptionalUser } from "~/utils";
import {
  TbHome2,
  TbCalendarPlus,
  TbUser,
  TbListNumbers,
  TbPlus,
} from "react-icons/tb";
import { Link } from "@remix-run/react";

export function AuthenticatedFrontPage() {
  const user = useOptionalUser();
  console.log(user);
  return (
    <div className="relative grid min-h-full">
      <div className="p-4">test</div>

      <button className="text-primary-conten btn-circle btn-lg btn fixed bottom-20 right-4 flex bg-primary">
        <TbPlus size={24} />
      </button>
      <div className="nav fixed bottom-0 w-screen bg-primary text-primary-content">
        <ul className="grid h-[4em] grid-cols-4">
          <li className="flex items-center justify-center">
            <Link to="">
              <TbHome2 size={24} />
            </Link>
          </li>
          <li className="flex items-center justify-center">
            <Link to="ranking">
              <TbListNumbers size={24} />
            </Link>
          </li>
          <li className="flex items-center justify-center">
            <Link to="events">
              <TbCalendarPlus size={24} />
            </Link>
          </li>
          <li className="flex items-center justify-center">
            <Link to="profile">
              <TbUser size={24} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
