import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Reviews AI",
  description: "Riverflex Reviews AI",
};

/**
 * Root layout for the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      {/* Set the icon for the website. */}
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>

      {/* Render the body of the application. */}
      <body className="h-full">
        {/* A Navbar is suspended on top of the layout. If this component would become complex, it should be moved
        into a dedicated file. */}
        <Suspense>
          <Navbar />
        </Suspense>

        {/* The content of the page itself is shown here. We remove 4rem from the total height, since that's the 
        height of the navbar. This makes it so that the content takes up the entire screen without making it necessary
        to scroll to see the bottom. */}
        <main className="flex flex-col h-[calc(100vh-4rem)] bg-neutral-100/80">
          {children}
        </main>
      </body>
    </html>
  );
}
