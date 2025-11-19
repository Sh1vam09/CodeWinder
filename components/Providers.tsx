"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// Note: If you get a type error here, you can remove 'type ThemeProviderProps'
// and just use 'any' or React.ComponentProps<typeof NextThemesProvider>
import { type ThemeProviderProps } from "next-themes/dist/types";

export default function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
