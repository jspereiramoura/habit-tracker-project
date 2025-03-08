import { Mock, vi } from "vitest";
import getCookie from "./getCookie";
import prepareHeadersWithAuth from "./prepareHeadersWithAuth";

describe("Utils: prepareHeadersWithAuth", () => {
  beforeEach(() => {
    vi.mock("./getCookie.ts");
  });

  it("should call getCookie with 'token' key", () => {
    const headers = new Headers();

    prepareHeadersWithAuth(headers);

    expect(getCookie).toHaveBeenCalledWith("token");
  });
  it("should set the 'authorization' header with the token value", () => {
    const headers = new Headers();
    (getCookie as Mock).mockReturnValue("mocked_token");

    expect(headers.get("authorization")).toBeNull();

    prepareHeadersWithAuth(headers);

    expect(headers.get("authorization")).toBe("Bearer mocked_token");
  });
  it("should return the headers object", () => {
    const headers = new Headers();
    const result = prepareHeadersWithAuth(headers);
    expect(result).toStrictEqual(headers);
  });
});
