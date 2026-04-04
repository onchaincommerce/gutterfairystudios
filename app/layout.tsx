import type { Metadata } from "next";
import "./globals.css";
import ScrollBackground from "./components/ScrollBackground";

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
        <div className="desktop-page">
          {children}
        </div>
      </body>
    </html>
  );
}
