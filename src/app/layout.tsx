import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import ClientProviders from "@/components/ClientProviders";
import "./globals.css";

// Використовуємо Gilroy як основний шрифт (завантажується через CSS)
const gilroy = {
  variable: "--font-gilroy",
};

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
        <body className={`${gilroy.variable} antialiased font-gilroy`} style={{backgroundColor: 'var(--bg-secondary, #f8f9fa)', color: 'var(--text-primary, #212121)'}}>
          <ClientProviders>
            {children}
          </ClientProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
