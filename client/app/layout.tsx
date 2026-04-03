import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noted",
  description: "Virtual sticky notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=DynaPuff:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        style={{
          fontFamily: "'Inter', sans-serif",
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}