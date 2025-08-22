import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Luke Docs - Terminal-Inspired Documentation",
  description: "AI-optimized developer documentation with US Graphics terminal aesthetic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
