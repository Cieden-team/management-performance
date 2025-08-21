import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ClientProviders from "@/components/ClientProviders";
import "./globals.css";

// Використовуємо Inter як основний шрифт
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Performance Management System",
  description: "Performance management system for modern teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} antialiased font-inter`} style={{backgroundColor: 'var(--bg-secondary, #f8f9fa)', color: 'var(--text-primary, #212121)'}}>
          <ClientProviders>
            {children}
          </ClientProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
