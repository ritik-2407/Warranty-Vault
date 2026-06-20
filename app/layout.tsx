import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Warranty Tracker",
  description: "Track your product warranties and never miss an expiry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
