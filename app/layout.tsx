import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import type { Viewport } from "next";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "CambioML - AI Integration & Development Platform",
  description:
    "CambioML is an advanced AI platform that integrates multiple AI models including Google Gemini and OpenAI, providing powerful AI capabilities for developers and businesses.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#06b6d4" },
    { media: "(prefers-color-scheme: dark)", color: "#06b6d4" },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0..200"
          />
        </head>
        <body
          className={cn(
            inter.className,
            "bg-charcoal antialiased h-full w-full"
          )}
        >
          <NavBar />
          {children}
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
