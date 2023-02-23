import avatar3 from "~/images/avatars/avatar3.svg";
interface IProps {
  name: string;
  isWinner: boolean;
}

export function IcingAvatar({ name, isWinner }: IProps) {
  return (
    <div className="flex flex-col items-center">
      {isWinner ? (
        <p className="font-medium text-green-500">W</p>
      ) : (
        <p className="font-medium text-red-500">L</p>
      )}
      <div className="avatar relative my-1">
        <div className="w-10">
          <img src={avatar3} alt="avatar" />
        </div>
      </div>
      <p className="text-sm">{name}</p>
    </div>
  );
}
