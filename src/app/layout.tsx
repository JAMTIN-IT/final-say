import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Final Say — Your words. Your wishes. Your way.",
  description:
    "Final Say gives you the space to capture your wishes, your words, and your truth — so the people you love never have to guess.",
  keywords: ["end of life planning", "digital legacy", "final wishes", "estate planning"],
  manifest: "/manifest.json",
  openGraph: {
    title: "Final Say",
    description: "Leave nothing unsaid.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2C2A4A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-ivory text-stone-700 font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ember focus:text-white focus:px-4 focus:py-2 focus:rounded-input focus:font-medium"
        >
          Skip to main content
        </a>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
