import type { Metadata } from "next";

import "./globals.css";



export const metadata: Metadata = {
  title: "Eco Notificaciones",
  description: "Procesador de notificaciones ecológicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
