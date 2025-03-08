import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reviews AI",
  description: "Riverflex Reviews AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="h-full">
        <Suspense>
          <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
              <a className="btn btn-ghost text-xl">Riverflex</a>
            </div>
          </div>
        </Suspense>

        <main className="flex flex-col h-[calc(100vh-4rem)]">{children}</main>
      </body>
    </html>
  );
}
