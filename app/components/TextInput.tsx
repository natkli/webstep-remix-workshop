import clsx from "clsx";
import { forwardRef, type Ref } from "react";

interface IProps {
  label: string;
  error?: string | null;
  name: string;
  placeholder?: string;
  type?: "text" | "password";
}

export const TextInput = forwardRef(TextInputComponent);

function TextInputComponent(
  props: IProps,
  ref: Ref<HTMLInputElement> | undefined
) {
  const { label, error, name, placeholder, type = "text" } = props;

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
