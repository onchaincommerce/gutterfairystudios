import type { Metadata } from "next";
import "./globals.css";

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
        <div aria-hidden="true" className="cloud-sky">
          <div className="cloud-sky__base" />
          <div className="cloud-sky__haze cloud-sky__haze--center" />
          <div className="cloud-sky__haze cloud-sky__haze--top" />
          <div className="cloud-sky__haze cloud-sky__haze--lavender" />
          <div className="cloud-sky__haze cloud-sky__haze--blue" />
          <div className="cloud-sky__cloud cloud-sky__cloud--mass-left" />
          <div className="cloud-sky__cloud cloud-sky__cloud--mass-right" />
          <div className="cloud-sky__cloud cloud-sky__cloud--mass-bottom" />
          <div className="cloud-sky__cloud cloud-sky__cloud--mass-bottom-right" />
          <div className="cloud-sky__cloud cloud-sky__cloud--mass-top" />
          <div className="cloud-sky__cloud cloud-sky__cloud--mid-left" />
          <div className="cloud-sky__cloud cloud-sky__cloud--mid-right" />
          <div className="cloud-sky__cloud cloud-sky__cloud--edge-left" />
          <div className="cloud-sky__cloud cloud-sky__cloud--edge-right" />
          <div className="cloud-sky__cloud cloud-sky__cloud--puff-left" />
          <div className="cloud-sky__cloud cloud-sky__cloud--puff-right" />
          <div className="cloud-sky__cloud cloud-sky__cloud--puff-mid" />
          <div className="cloud-sky__cloud cloud-sky__cloud--puff-top-left" />
          <div className="cloud-sky__cloud cloud-sky__cloud--puff-top-right" />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
