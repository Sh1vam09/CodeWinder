import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar"; // Import the Navbar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeWinder",
  description: "Competitive Programming Hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {/* Since the Navbar is fixed, we often need a wrapper
             to push content down so it isn't hidden behind the nav.
             If your pages look cut off at the top, change <div> below to:
             <div className="pt-20">
          */}
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
