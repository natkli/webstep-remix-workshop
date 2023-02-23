import { Link } from "@remix-run/react";
import { TbPlus } from "react-icons/tb";

interface IProps {
  url: string;
}

export function StickyButton({ url }: IProps) {
  return (
    <div className="relative">
      <div className="fixed bottom-0 w-full max-w-[30rem]">
        <div className="bordered relative flex flex-row-reverse">
          <Link to={url} className="absolute bottom-20 right-8 z-50 md:right-0">
            <button className="btn-circle btn-lg btn">
              <TbPlus size={26} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
