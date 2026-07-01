import type { Metadata } from "next";
import Link from "next/link";
import { isStaticMode } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: "Supplement Shop",
  description: "Curated supplement collections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <header className="bg-white border-b border-gray-200">
          <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Supplement Shop
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/products"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Products
              </Link>
              {!isStaticMode && (
                <Link
                  href="/plans/new"
                  className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                >
                  New Plan
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
