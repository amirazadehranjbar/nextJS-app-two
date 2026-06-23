"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// React 19 warns about script tags inside components.
// next-themes injects one intentionally to prevent theme flash (FOUC) —
// the warning is a false positive for this use case. Suppressing it in dev only.
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalError = console.error
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) {
      return
    }
    originalError(...args)
  }
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}