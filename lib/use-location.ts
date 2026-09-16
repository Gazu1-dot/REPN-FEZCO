"use client";
import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener("hashchange", onChange);
  window.addEventListener("repn:locationchange", onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("repn:locationchange", onChange);
  };
}
const snapshot = () => window.location.search + window.location.hash;
const serverSnapshot = () => "";

export function useLocation() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}

export function updateLocation(values: Record<string, string | null>, clearHash = false) {
  const url = new URL(window.location.href);
  for (const [name, value] of Object.entries(values)) {
    if (value === null) url.searchParams.delete(name);
    else url.searchParams.set(name, value);
  }
  if (clearHash) url.hash = "";
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event("repn:locationchange"));
}
