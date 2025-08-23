import { JetBrains_Mono } from "next/font/google";
import { metadata, viewport } from "./metadata";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="default" name="apple-mobile-web-app-status-bar-style" />
        <meta content="luke-docs" name="apple-mobile-web-app-title" />
        <meta content="yes" name="mobile-web-app-capable" />
        <meta content="#ffffff" name="theme-color" />
      </head>
      <body
        className={`${jetbrainsMono.variable} font-mono antialiased bg-white text-black`}
      >
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
