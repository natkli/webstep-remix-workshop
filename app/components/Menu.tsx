import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";
import { useState, type ReactElement } from "react";
import { TbFlame, TbHome2, TbUser } from "react-icons/tb";

interface IMenuList {
  link: string;
  icon: ReactElement<any, any>;
}

const menuList: IMenuList[] = [
  {
    link: "/",
    icon: <TbHome2 size={24} />,
  },
  {
    link: "/ranking",
    icon: <TbFlame size={24} />,
  },
  {
    link: "/profile",
    icon: <TbUser size={24} />,
  },
];

export default function Menu() {
  const { pathname } = useLocation();

  return (
    <div className="nav fixed bottom-0 z-40 w-full max-w-[32rem] bg-primary text-primary-content">
      <ul className={`grid h-[4em] grid-cols-3`}>
        {menuList.map(({ link, icon }) => {
          return (
            <Link
              key={link}
              to={link}
              className={clsx(
                "flex items-center justify-center border-b-2",
                link === pathname ? "border-icing-red" : "border-primary"
              )}
            >
              <li>{icon}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
