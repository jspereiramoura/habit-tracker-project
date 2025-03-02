import { InputHTMLAttributes } from "react";
import CheckedIcon from "../icons/CheckedIcon";

type CheckboxProps = {
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <div className={`inline-flex items-center relative ${className ?? ""}`}>
      <input
        {...props}
        type="checkbox"
        className="peer cursor-pointer appearance-none h-6 w-6 border rounded-lg border-primary checked:bg-primary"
      />
      <CheckedIcon className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
};

export default Checkbox;
