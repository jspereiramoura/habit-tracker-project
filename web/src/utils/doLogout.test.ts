import { vi } from "vitest";
import { doLogout } from "./doLogout";

describe("Utils: doLogout", () => {
  let reloadSpy: VoidFunction;
  
  beforeEach(() => {
    reloadSpy = vi.fn();
    vi.stubGlobal("window", {
      location: { reload: reloadSpy }
    });

    vi.stubGlobal("document", {
      cookie: ""
    });
  });

  it("should do nothing if window is undefined", () => {
    vi.stubGlobal("window", undefined);
    doLogout();

    expect(reloadSpy).not.toHaveBeenCalled();
    expect(document.cookie).toBe("");
  });

  it("should remove cookie and reload page", () => {
    doLogout();

    expect(reloadSpy).toHaveBeenCalled();
    expect(document.cookie).toBe(
      "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    );
  });
});
