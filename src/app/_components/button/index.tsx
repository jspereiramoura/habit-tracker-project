import Link from "next/link";

type ButtonTypes = "PRIMARY" | "SECONDARY";

type ButtonRootProps = {
  content?: string;
  buttonType?: ButtonTypes;
};

type ButtonProps = {
  as: "button";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps = {
  as: "a";
} & React.ComponentProps<typeof Link>;

type ButtonPropsWithRoot = ButtonRootProps & (ButtonProps | ButtonLinkProps);

export default function Button({
  content,
  as = "button",
  buttonType = "PRIMARY",
  ...defaultProps
}: ButtonPropsWithRoot) {
  const buttonStyleStrategy: Record<ButtonTypes, string> = {
    PRIMARY: "bg-primary text-white hover:bg-primary--hovered",
    SECONDARY: "bg-white text-primary border-1 border-primary hover:underline"
  };
  const className = `
  ${defaultProps.className ?? ""}
  block h-11 leading-11 text-center
  px-6 font-semibold rounded-lg
  ${buttonStyleStrategy[buttonType]}
`;

  const props = {
    ...defaultProps,
    children: content ?? defaultProps.children,
    className
  };

  return as === "button" ? (
    <button {...(props as ButtonProps)} />
  ) : (
    <Link {...(props as ButtonLinkProps)} />
  );
}
