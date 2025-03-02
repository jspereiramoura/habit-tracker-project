export default function checkIfIsMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 1024;
}
