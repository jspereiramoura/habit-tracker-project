import { vi } from "vitest";
import getCookie from "./getCookie";

describe("Utils: getCookie", () => {
  beforeEach(() => {
    vi.stubGlobal("document", {
      cookie: "testCookie=testCookieValue; anotherCookie=anotherCookieValue"
    });
  });

  it("should return the cookie value if it exists", () => {
    expect(getCookie("testCookie")).toBe("testCookieValue");
    expect(getCookie("anotherCookie")).toBe("anotherCookieValue");
  });

  it("should return null if the cookie does not exist", () => {
    expect(getCookie("nonExistentCookie")).toBe(null);
  });
});
