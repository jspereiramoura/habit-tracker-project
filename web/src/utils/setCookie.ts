export default function setCookie(
  name: string,
  value: string,
  days?: number,
  path: string = "/",
  sameSite: "Strict" | "Lax" | "None" = "Lax",
  secure: boolean = false
): void {
  let cookieString = `${name}=${encodeURIComponent(value)}; path=${path}; SameSite=${sameSite}`;

  if (days !== undefined) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${date.toUTCString()}`;
  }

  if (secure) {
    cookieString += "; Secure";
  }

  document.cookie = cookieString;
}
