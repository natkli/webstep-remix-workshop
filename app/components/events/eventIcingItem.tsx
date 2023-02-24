import avatar3 from "~/images/avatars/avatar3.svg";

export function EventIcingItem() {
  return (
    <div className="card flex flex-col gap-2 bg-primary-content p-4 shadow-lg">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <div className="avatar relative">
            <div className="w-10">
              <img src={avatar3} alt="avatar" />
            </div>
          </div>
          <p className="text-md flex flex-col font-bold">
            Dummy Testo<span className="text-xs font-light">@dumm</span>
          </p>
        </div>
        <p className="text-lg font-medium text-green-500">W</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <div className="avatar relative">
            <div className="w-10">
              <img src={avatar3} alt="avatar" />
            </div>
          </div>
          <p className="text-md flex flex-col font-bold">
            Dexter Epson <span className="text-xs font-light">@dszs</span>
          </p>
        </div>
        <p className="text-lg font-medium text-red-500">L</p>
      </div>
    </div>
  );
}
