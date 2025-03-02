export default function SidebarIcon({ className }: { className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={className ?? "size-6"}
    >
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        rx="7"
        stroke="white"
        strokeWidth="4"
      />
      <path
        d="M8 1H17V47H8C4.13401 47 1 43.866 1 40V8C1 4.13401 4.13401 1 8 1Z"
        stroke="white"
        strokeWidth="4"
      />
    </svg>
  );
}
