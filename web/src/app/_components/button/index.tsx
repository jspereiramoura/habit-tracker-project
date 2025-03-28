import Link from "next/link";

type ButtonRootProps = {
  content?: string;
  buttonType?: ButtonTypes;
};

type ButtonProps = {
  as?: "button";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps = {
  as: "a";
} & React.ComponentProps<typeof Link>;

type ButtonTypes = "PRIMARY" | "SECONDARY";
type ButtonPropsWithRoot = ButtonRootProps & (ButtonProps | ButtonLinkProps);

export const buttonStyleStrategy: Record<ButtonTypes, string> = {
  PRIMARY: "bg-primary text-white hover:bg-primary--hovered disabled:cursor-not-allowed",
  SECONDARY: "bg-white text-primary border-1 border-primary hover:underline disabled:cursor-not-allowed"
};

export default function Button({
  content,
  as = "button",
  buttonType = "PRIMARY",
  ...defaultProps
}: ButtonPropsWithRoot) {
  const buttonDefaultClasses = `
  ${defaultProps.className ?? ""}
  cursor-pointer
  block h-11 leading-11 text-center
  px-6 font-semibold rounded-lg
  ${buttonStyleStrategy[buttonType]}
  `;

  const props = {
    ...defaultProps,
    children: content ?? defaultProps.children,
    className: buttonDefaultClasses
  };

  return as === "button" ? (
    <button {...(props as ButtonProps)} />
  ) : (
    <Link {...(props as ButtonLinkProps)} />
  );
}
