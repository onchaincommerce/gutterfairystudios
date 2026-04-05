import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import RetroMusicPlayer from "./components/RetroMusicPlayer";
import ScrollBackground from "./components/ScrollBackground";
import UISoundEffects from "./components/UISoundEffects";

export const metadata: Metadata = {
  title: "Gutter Fairy",
  description: "Curated secondhand, upcycled goods, and creative workshops from Gutter Fairy.",
  icons: {
    icon: "/favicon-fairy.png?v=2",
    apple: "/apple-touch-fairy.png?v=2",
    shortcut: "/favicon-fairy.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased relative">
        <ScrollBackground />
        <UISoundEffects />
        <div className="desktop-page">
          {children}
        </div>
        <RetroMusicPlayer />
        <Analytics />
      </body>
    </html>
  );
}
