import { getAvatarById } from "~/utils";

interface IProps {
  name: string;
  avatarId: string;
}

export function ProfileAvatar({ name, avatarId }: IProps) {
  return (
    <div className="avatar mt-8 mb-4">
      <div className="w-28 rounded-full bg-neutral-focus text-neutral-content">
        <img
          src={getAvatarById(avatarId)}
          className="bg-neutral-content"
          alt={`${name} avatar`}
        />
      </div>
    </div>
  );
}
