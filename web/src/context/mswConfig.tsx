"use client";

import type { ComponentProps } from "react";
import { createContext, useState, useEffect } from "react";

const MSWContext = createContext("");

type Props = Omit<ComponentProps<typeof MSWContext.Provider>, "value">;

export default function MSWConfig({ children }: Props) {
  const [loaded, setLoaded] = useState(process.env.MUST_MOCK_API !== "true");

  useEffect(() => {
    if (process.env.MUST_MOCK_API === "true" && typeof window !== "undefined") {
      import("../test/msw/mswServerBrowser")
        .then(({ worker }) => worker.start())
        .then(() => setLoaded(true));
    } else {
      setLoaded(true);
    }
  }, []);

  return (
    <MSWContext.Provider value={""}>
      {loaded ? children : <></>}
    </MSWContext.Provider>
  );
}
