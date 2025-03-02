import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  PathnameContext,
  PathParamsContext
} from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { vi } from "vitest";
import { AppStore, makeStore, RootState } from "../../redux/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

vi.mock("next/navigation", importOriginal => {
  const actual = importOriginal();
  return {
    ...actual,
    useParams: vi.fn(),
    useRouter: vi.fn(),
    usePathname: vi.fn(),
    useSearchParams: vi.fn()
  };
});

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    store = makeStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();

    return (
      <AppRouterContext.Provider value={router}>
        <PathParamsContext.Provider value={params}>
          <PathnameContext.Provider value={pathname}>
            <Provider store={store}>{children}</Provider>
          </PathnameContext.Provider>
        </PathParamsContext.Provider>
      </AppRouterContext.Provider>
    );
  };

  return {
    store,
    wrapper: Wrapper,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
}
