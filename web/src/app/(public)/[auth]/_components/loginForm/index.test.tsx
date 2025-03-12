import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Mock, vi } from "vitest";
import LoginForm from ".";
import {
  useLoginMutation,
  useRegisterMutation
} from "../../../../../redux/services/auth";
import { renderWithProviders } from "../../../../../test/utils/renderWithProviders";
import { errorModalTexts, loginErrorMessages } from "./errorMessages";
import { useRouter } from "next/navigation";
import * as modalSlice from "../../../../../redux/slices/modalSlice";
import setCookie from "../../../../../utils/setCookie";

vi.mock("../../../../../redux/services/auth.ts", { spy: true });
vi.mock("../../../../../utils/setCookie.ts", { spy: true });

const fieldNames = {
  username: /nome de usuário/i,
  password: /senha/i,
  email: /email/i,
  loginButton: /entrar/i,
  registerButton: /registrar/i
} as const;

const mockedFields = {
  username: "user",
  password: "password",
  email: "email@mocked.com",
  fail: {
    email: "",
    username: "",
    password: ""
  }
} as const;

describe("Components: LoginForm", () => {
  it("should render the login form", () => {
    renderWithProviders(<LoginForm isLogin />);
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: fieldNames.username })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(fieldNames.password)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: fieldNames.loginButton })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", { name: fieldNames.email })
    ).not.toBeInTheDocument();
  });

  it("should render the registration form", () => {
    renderWithProviders(<LoginForm isLogin={false} />);
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: fieldNames.email })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: fieldNames.username })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(fieldNames.password)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: fieldNames.registerButton })
    ).toBeInTheDocument();
  });

  it("should render the error messages in login page", async () => {
    const user = userEvent.setup();

    renderWithProviders(<LoginForm isLogin />);
    const submitButton = screen.getByRole("button", {
      name: fieldNames.loginButton
    });

    await user.click(submitButton);

    expect(
      await screen.findByText(loginErrorMessages.EMPTY_PASS)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(loginErrorMessages.EMPTY_USER)
    ).toBeInTheDocument();
  });

  it("should render the error messages in registration page", async () => {
    const user = userEvent.setup();

    renderWithProviders(<LoginForm isLogin={false} />);
    const submitButton = screen.getByRole("button", {
      name: fieldNames.registerButton
    });

    await user.click(submitButton);

    expect(
      await screen.findByText(loginErrorMessages.INVALID_EMAIL)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(loginErrorMessages.INVALID_USER)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(loginErrorMessages.INVALID_PASS)
    ).toBeInTheDocument();
  });

  it("should call the login mutation", async () => {
    const user = userEvent.setup();
    const loginSpy = vi.fn();
    (useLoginMutation as Mock).mockReturnValue([loginSpy]);

    renderWithProviders(<LoginForm isLogin />);
    const submitButton = screen.getByRole("button", {
      name: fieldNames.loginButton
    });

    await user.type(
      screen.getByRole("textbox", { name: fieldNames.username }),
      mockedFields.username
    );
    await user.type(
      screen.getByLabelText(fieldNames.password),
      mockedFields.password
    );
    await user.click(submitButton);

    expect(loginSpy).toHaveBeenCalledWith({
      username: mockedFields.username,
      password: mockedFields.password
    });
  });

  it("should call the register mutation", async () => {
    const user = userEvent.setup();
    const registerSpy = vi.fn();
    (useRegisterMutation as Mock).mockReturnValue([registerSpy]);

    renderWithProviders(<LoginForm isLogin={false} />);
    const submitButton = screen.getByRole("button", {
      name: fieldNames.registerButton
    });

    await user.type(
      screen.getByRole("textbox", { name: fieldNames.email }),
      mockedFields.email
    );
    await user.type(
      screen.getByRole("textbox", { name: fieldNames.username }),
      mockedFields.username
    );
    await user.type(
      screen.getByLabelText(fieldNames.password),
      mockedFields.password
    );
    await user.click(submitButton);

    expect(registerSpy).toHaveBeenCalledWith({
      email: mockedFields.email,
      username: mockedFields.username,
      password: mockedFields.password
    });
  });

  it("should set cookies and redirect to dashboard after login", async () => {
    const user = userEvent.setup();
    const pushSpy = vi.fn();
    const loginSpy = vi
      .fn()
      .mockResolvedValue({ data: { access_token: "mocked_token" } });

    (useLoginMutation as Mock).mockReturnValue([loginSpy]);
    (useRouter as Mock).mockReturnValue({ push: pushSpy });

    renderWithProviders(<LoginForm isLogin />);

    const submitButton = screen.getByRole("button", {
      name: fieldNames.loginButton
    });

    await user.type(
      screen.getByRole("textbox", { name: fieldNames.username }),
      mockedFields.username
    );
    await user.type(
      screen.getByLabelText(fieldNames.password),
      mockedFields.password
    );
    await user.click(submitButton);

    expect(pushSpy).toHaveBeenCalledWith("/dashboard");
    expect(setCookie).toHaveBeenCalledWith("token", "mocked_token");
  });

  it.each`
    errorType         | errorStatusCode
    ${"UNAUTHORIZED"} | ${401}
    ${"GENERIC"}      | ${500}
  `(
    "should show an error modal when there is an error",
    async ({ errorStatusCode, errorType }) => {
      const user = userEvent.setup();
      const loginSpy = vi
        .fn()
        .mockReturnValue({ error: { status: errorStatusCode }, data: {} });
      const openErrorModalSpy = vi.spyOn(modalSlice, "openModal");

      (useLoginMutation as Mock).mockReturnValue([loginSpy]);

      renderWithProviders(<LoginForm isLogin />);
      const submitButton = screen.getByRole("button", {
        name: fieldNames.loginButton
      });

      await user.type(
        screen.getByRole("textbox", { name: fieldNames.username }),
        mockedFields.username
      );
      await user.type(
        screen.getByLabelText(fieldNames.password),
        mockedFields.password
      );
      await user.click(submitButton);

      expect(openErrorModalSpy).toHaveBeenCalledWith({
        ...errorModalTexts[errorType as "GENERIC" | "UNAUTHORIZED"]
      });
    }
  );
});
