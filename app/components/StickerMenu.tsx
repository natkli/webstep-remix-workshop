import { type ReactElement } from "react";

import { Link, useLocation } from "@remix-run/react";
import { TbFlame, TbHome2, TbUser } from "react-icons/tb";

import clsx from "clsx";

interface IMenuList {
  link: string;
  icon: ReactElement<any, any>;
  cononicalLinks?: string[];
}

const menuList: IMenuList[] = [
  {
    link: "/",
    icon: <TbHome2 size={24} />,
    cononicalLinks: ["/events"],
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

export function StickyMenu() {
  const { pathname } = useLocation();

  function isActiveLink(menu: IMenuList) {
    const firstPath = `/${pathname.split("/")[1]}`;
    return menu.link === firstPath || menu.cononicalLinks?.includes(firstPath);
  }

  return (
    <div className="nav fixed -bottom-[1px] z-40 w-full max-w-[32rem] bg-primary text-primary-content">
      <ul className={`grid h-[4em] grid-cols-3`}>
        {menuList.map((menu) => {
          return (
            <Link
              key={menu.link}
              to={menu.link}
              className={clsx(
                "flex items-center justify-center border-b-[3px]",
                isActiveLink(menu) ? "border-icing-orange" : "border-primary"
              )}
            >
              <li>{menu.icon}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
