import { Link } from "@remix-run/react";
import clsx from "clsx";
import { TbPlus } from "react-icons/tb";

type StickyButtonColor = "red" | "black";
interface IProps {
  url: string;
  color?: StickyButtonColor;
}

export function StickyButton({ url, color }: IProps) {
  return (
    <div className="relative">
      <div className="fixed bottom-0 w-full max-w-[30rem]">
        <div className="bordered relative flex flex-row-reverse">
          <Link to={url} className="absolute bottom-20 right-8 z-50 md:right-0">
            <button
              className={clsx(
                "btn-circle btn-lg btn",
                color === "red" && "border-icing-orange bg-icing-orange"
              )}
            >
              <TbPlus size={26} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
