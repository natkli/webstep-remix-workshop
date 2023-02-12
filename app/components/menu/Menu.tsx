import { Link } from "@remix-run/react";
import { ReactElement } from "react";
import { TbCalendarEvent, TbFlame, TbHome2, TbUser } from "react-icons/tb";

interface IMenuList {
  link: string;
  icon: ReactElement<any, any>;
}

const menuList: IMenuList[] = [
  {
    link: "",
    icon: <TbHome2 size={24} />,
  },
  {
    link: "ranking",
    icon: <TbFlame size={24} />,
  },
  {
    link: "my-events",
    icon: <TbCalendarEvent size={24} />,
  },
  {
    link: "profile",
    icon: <TbUser size={24} />,
  },
];

export default function Menu() {
  return (
    <div className="nav fixed bottom-0 z-40 w-screen bg-primary text-primary-content">
      <ul className={`grid h-[4em] grid-cols-4`}>
        {menuList.map(({ link, icon }, index) => {
          return (
            <Link
              key={index}
              to={link}
              className="flex items-center justify-center"
            >
              <li>{icon}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
