import { ReactNode } from "react";

type SectionProps = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export default function Section({
  children,
  title,
  subtitle,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={`font-montserrat p-4 bg-white rounded-md ${className}`}
      {...props}
    >
      <h1 className="font-bold">{title}</h1>
      <h2 className="text-xs text-gray-800">{subtitle}</h2>
      <div className="mt-2 text-sm text-gray-800">{children}</div>
    </section>
  );
}
