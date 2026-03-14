import { useState, useEffect } from "react";

type Tab = "home" | "dot" | "alias" | "generator" | "signature";

const ROUTE_MAP: Record<string, Tab> = {
  "":                  "home",
  "#/":                "home",
  "#/home":            "home",
  "#/gmail-dot-trick": "dot",
  "#/gmail-alias":     "alias",
  "#/email-generator": "generator",
  "#/email-signature": "signature",
};

const TAB_TO_ROUTE: Record<Tab, string> = {
  home:      "#/",
  dot:       "#/gmail-dot-trick",
  alias:     "#/gmail-alias",
  generator: "#/email-generator",
  signature: "#/email-signature",
};

function getTabFromHash(): Tab {
  const hash = window.location.hash;
  return ROUTE_MAP[hash] ?? "home";
}

export function useHashRouter(): [Tab, (tab: Tab) => void] {
  const [activeTab, setActiveTabState] = useState<Tab>(getTabFromHash);

  useEffect(() => {
    const handler = () => setActiveTabState(getTabFromHash());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const setActiveTab = (tab: Tab) => {
    window.location.hash = TAB_TO_ROUTE[tab];
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return [activeTab, setActiveTab];
}
