import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ScrollRainbow from "./components/ScrollRainbow";
import ScrollBackground from "./components/ScrollBackground";

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gutter Fairy",
  description: "Embroidery designs with raw, DIY punk energy",
  icons: {
    icon: "/fairy.png",
    apple: "/fairy.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mono.variable} antialiased relative`}>
        <ScrollBackground />
        <ScrollRainbow />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
