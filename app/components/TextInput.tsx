import clsx from "clsx";
import { RefObject } from "react";

interface IProps {
  label: string;
  error?: string | null;
  name: string;
  placeholder?: string;
  ref: RefObject<any>;
  type?: "text" | "password";
}

export function TextInput({
  label,
  error,
  name,
  placeholder,
  ref,
  type = "text",
}: IProps) {
  return (
    <div className="form-control mt-2 w-full max-w-xs">
      <label className="label">
        <span className="label-text-alt text-sm">{label}</span>
        {error && <span className="label-text-alt text-error">{error}</span>}
      </label>
      <input
        type={type}
        ref={ref}
        name={name}
        placeholder={placeholder}
        className={clsx(
          "input-bordered input w-full max-w-xs",
          error && "input-error"
        )}
      />
    </div>
  );
}
