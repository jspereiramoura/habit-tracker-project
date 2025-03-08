import { ReactNode } from "react";
import { createIdFromText } from "../../../utils/createIdFromText";

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
  const titleID = createIdFromText(`section_${title}`);
  const subtitleID = createIdFromText(`section_${subtitle}`);

  return (
    <section
      aria-labelledby={titleID}
      aria-describedby={subtitleID}
      className={`font-montserrat p-4 bg-white rounded-md ${className}`}
      {...props}
    >
      <h1 id={titleID} className="font-bold">
        {title}
      </h1>
      <h2 id={subtitleID} className="text-xs text-gray-800">
        {subtitle}
      </h2>
      <div className="mt-2 text-sm text-gray-800">{children}</div>
    </section>
  );
}
