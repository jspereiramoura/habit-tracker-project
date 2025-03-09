import { InputHTMLAttributes } from "react";

type InputProps = {
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ errorMessage, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        {...props}
        aria-label={
          props["aria-label"] ??
          `Campo de texto ${props.placeholder ?? props.name}`
        }
        className={`
          ${props.className ?? ""}
          border border-gray-300 rounded-lg p-2 disabled:bg-gray-50 disabled:cursor-not-allowed
        `}
      />
      {errorMessage && (
        <span className="text-primary text-xs text-left">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
