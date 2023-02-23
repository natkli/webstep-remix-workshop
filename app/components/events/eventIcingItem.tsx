import avatar3 from "~/images/avatars/avatar3.svg";

export function EventIcingItem() {
  return (
    <div className="mt-4 flex justify-between">
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center gap-2">
          <div className="avatar relative">
            <div className="w-12">
              <img src={avatar3} alt="avatar" />
            </div>
          </div>
          <p className="text-md flex flex-col font-bold">
            Dummy <span className="text-xs font-light">@dumm</span>
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <p className="text-lg font-medium text-green-500">W</p>
        <p className="text-lg font-medium text-red-500">L</p>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center gap-2">
          <div className="avatar relative">
            <div className="w-12">
              <img src={avatar3} alt="avatar" />
            </div>
          </div>
          <p className="text-md flex flex-col font-bold">
            Dexter <span className="text-xs font-light">@dszs</span>
          </p>
        </div>
      </div>
    </div>
  );
}
