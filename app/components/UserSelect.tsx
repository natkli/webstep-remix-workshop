import clsx from "clsx";
import { forwardRef, type Ref } from "react";

interface IUser {
  name: string;
  id: string;
  username: string;
  avatarId: string;
}

interface IProps {
  label: string;
  error?: boolean;
  name: string;
  users: IUser[];
}

export const UserSelect = forwardRef(UserSelectComponent);

function UserSelectComponent(
  props: IProps,
  ref: Ref<HTMLSelectElement> | undefined
) {
  const { label, error, name, users } = props;

  return (
    <div className="form-control mt-2 w-full max-w-xs">
      <div className="form-control mt-2 w-full max-w-xs">
        <label className="label">
          <span className="label-text-alt text-sm">{label}</span>
        </label>
        <select
          className={clsx("select-bordered select", error && "select-error")}
          name={name}
          ref={ref}
          defaultValue={users[0].id}
        >
          {users.map(({ id, name, username }) => {
            return (
              <option key={id} value={id}>
                {name} @{username}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
