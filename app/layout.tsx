import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import { AuthProvider } from "../context/SessionContext";
import { PermissionsProvider } from "@/context/PermissionsContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Victoria Commercial Bank Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-gray-200"
      >
        <SessionProvider>
        <AuthProvider>
        <PermissionsProvider>
          {children}
          </PermissionsProvider>
        </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
