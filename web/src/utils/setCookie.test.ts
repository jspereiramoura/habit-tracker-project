import { vi } from "vitest";
import setCookie from "./setCookie";

describe("Utils: setCookie", () => {
  beforeEach(() => {
    vi.stubGlobal("document", {
      cookie: ""
    });

    vi.setSystemTime("Tue, 12 Mar 2024 00:00:00 GMT");
  });

  it("should set a cookie with expires", () => {
    setCookie("test", "test", 1);
    expect(document.cookie).toBe(`test=test; path=/; SameSite=Lax; expires=Wed, 13 Mar 2024 00:00:00 GMT`);
  });

  it("should set a cookie without expires", () => {
    setCookie("test", "test");
    expect(document.cookie).toBe("test=test; path=/; SameSite=Lax");
  });

  it("should set a cookie with path", () => {
    setCookie("test", "test", 1, "/test");
    expect(document.cookie).toBe(
      "test=test; path=/test; SameSite=Lax; expires=Wed, 13 Mar 2024 00:00:00 GMT"
    );
  });

  it("should set a cookie with SameSite", () => {
    setCookie("test", "test", 1, "/", "Strict");
    expect(document.cookie).toBe("test=test; path=/; SameSite=Strict; expires=Wed, 13 Mar 2024 00:00:00 GMT");
  });

  it("should set a cookie with Secure", () => {
    setCookie("test", "test", 1, "/", "None", true);
    expect(document.cookie).toBe("test=test; path=/; SameSite=None; expires=Wed, 13 Mar 2024 00:00:00 GMT; Secure");
  });
});
