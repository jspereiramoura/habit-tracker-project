import { vi } from "vitest";
import setCookie from "./setCookie";

describe("Utils: setCookie", () => {
  const MOCKED_DATE = new Date(2024, 2, 11);
  
  beforeEach(() => {
    vi.stubGlobal("document", {
      cookie: ""
    });

    vi.setSystemTime(MOCKED_DATE);
  });

  it("should set a cookie with expires", () => {
    const date = new Date();
    date.setTime(date.getTime() + 1000 * 60 * 60 * 24);
    const expires = date.toUTCString();
    setCookie("test", "test", 1);
    expect(document.cookie).toBe(`test=test; path=/; SameSite=Lax; expires=${expires}`);
  });

  it("should set a cookie without expires", () => {
    setCookie("test", "test");
    expect(document.cookie).toBe("test=test; path=/; SameSite=Lax");
  });

  it("should set a cookie with path", () => {
    const expectedDate = new Date();
    expectedDate.setTime(MOCKED_DATE.getTime() + 1000 * 60 * 60 * 24);

    setCookie("test", "test", 1, "/test");
    expect(document.cookie).toBe(
      "test=test; path=/test; SameSite=Lax; expires=Tue, 12 Mar 2024 03:00:00 GMT"
    );
  });

  it("should set a cookie with SameSite", () => {
    setCookie("test", "test", 1, "/", "Strict");
    expect(document.cookie).toBe("test=test; path=/; SameSite=Strict; expires=Tue, 12 Mar 2024 03:00:00 GMT");
  });

  it("should set a cookie with Secure", () => {
    setCookie("test", "test", 1, "/", "None", true);
    expect(document.cookie).toBe("test=test; path=/; SameSite=None; expires=Tue, 12 Mar 2024 03:00:00 GMT; Secure");
  });
});
