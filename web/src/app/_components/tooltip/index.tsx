export default function Tooltip({ text, className, children }: { text: string, className?: string, children?: React.ReactNode }) {
  return (
    <div className={`relative group ${className ?? ""}`}>
      {children}
      <span
      className="
        absolute
        transition-opacity duration-150 opacity-0 group-hover:opacity-100
        bg-black -top-1 right-0 -translate-y-full py-2 px-4 rounded-md
        text-xs min-w-20 max-w-40 w-max text-white
      "
    >
      {text}
    </span>
    </div>
  );
}
