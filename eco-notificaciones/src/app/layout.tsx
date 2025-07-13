import type { Metadata } from "next";
import "./globals.css";
import { Work_Sans } from 'next/font/google';

const work_Sans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '700'], // personaliza pesos
  variable: '--font-work-sans', // opcional para usar en Tailwind o CSS
});

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
      <head>
        <link rel="icon" href="/Assets/icon.png" type="image/png" />
      </head>
      <body className={work_Sans.className}>{children}</body>
    </html>
  );
}
