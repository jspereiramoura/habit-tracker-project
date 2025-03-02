import { describe, it, expect, vi } from "vitest";
import checkIfIsMobile from "./checkIfIsMobile";

describe("Utils: checkIfIsMobile", () => {
  it("should return true if window.innerWidth is less than 1024", () => {
    vi.stubGlobal("window", { innerWidth: 800 });
    expect(checkIfIsMobile()).toBeTruthy();
  });

  it("should return false if window.innerWidth is greater than or equal to 1024", () => {
    vi.stubGlobal("window", { innerWidth: 1024 });
    expect(checkIfIsMobile()).toBeFalsy();
  });

  it("should return false if window.innerWidth is greater than 1024", () => {
    vi.stubGlobal("window", { innerWidth: 1200 });
    expect(checkIfIsMobile()).toBeFalsy();
  });
});
