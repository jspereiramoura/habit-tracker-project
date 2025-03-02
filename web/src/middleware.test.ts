import { NextRequest } from "next/server";
import { vi } from "vitest";
import { middleware } from "./middleware";

function mockNextRequest(pathname: string) {
  const getCookiesSpy = vi.fn();
  const mockedBaseUrl = "http://localhost:3000";
  const mockedRequest = {
    cookies: {
      get: getCookiesSpy
    },
    url: `${mockedBaseUrl}/${pathname}`,
    nextUrl: {
      pathname: `/${pathname}`
    }
  } as unknown as NextRequest;

  return { mockedRequest, getCookiesSpy, mockedBaseUrl };
}
describe("Middleware: Auth Middleware", () => {
  it("should redirect users to home page", () => {
    const getCookiesSpy = vi.fn();
    const mockedBaseUrl = "http://localhost:3000";
    const mockedRequest = {
      cookies: {
        get: getCookiesSpy
      },
      url: `${mockedBaseUrl}/dashboard`,
      nextUrl: {
        pathname: `/dashboard`
      }
    } as unknown as NextRequest;
    getCookiesSpy.mockReturnValueOnce(null);

    const response = middleware(mockedRequest);

    expect(response?.status).toEqual(307);
    expect(response?.headers.get("location")).toEqual(mockedBaseUrl + "/");
  });

  it.each(["entrar", "registrar"])(
    "should redirect users to dashboard when pathname starts with %s",
    pathname => {
      const { getCookiesSpy, mockedBaseUrl, mockedRequest } =
        mockNextRequest(pathname);
      getCookiesSpy.mockReturnValueOnce("token");

      const response = middleware(mockedRequest);

      expect(response?.status).toEqual(307);
      expect(response?.headers.get("location")).toEqual(
        mockedBaseUrl + "/dashboard"
      );
    }
  );
});
