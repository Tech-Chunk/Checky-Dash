import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Providers } from "./providers";
import { WebNavbarComp } from "@/components/Webnavbar"
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: "home",
  description: "this is home (welcome home)"
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

import { ReactNode } from "react";

export default function HomeLayout ({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>

        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

      </head>
      <body
        className={clsx(
          "min-h-screen bg-background antialiased"
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <WebNavbarComp />
            <main className=" black">
              <div className="mx-auto dark">
              {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}