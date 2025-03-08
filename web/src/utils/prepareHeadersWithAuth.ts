import getCookie from "./getCookie";

export default function prepareHeadersWithAuth(headers: Headers) {
  const token = getCookie("token");

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  return headers;
}
