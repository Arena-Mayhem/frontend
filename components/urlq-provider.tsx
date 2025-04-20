"use client";

import { isDevEnv } from "@/lib/envs";
import type { PropsWithChildren } from "react";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

const urqlClient = new Client({
  url: isDevEnv()
    ? "http://localhost:8080/graphql"
    : "https://am-ql.onlemon.cloud/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export function URLQProvider({ children }: PropsWithChildren) {
  return <Provider value={urqlClient}>{children}</Provider>;
}
