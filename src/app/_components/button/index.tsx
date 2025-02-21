import { createElement } from "react";

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
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

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

  return createElement(
    as,
    {
      ...(defaultProps as React.Attributes),
      className: `
        ${defaultProps.className ?? ""}
        block h-11 leading-11 text-center
        px-6 font-semibold rounded-lg
        ${buttonStyleStrategy[buttonType]}
      `
    },
    content ?? defaultProps.children
  );
}
