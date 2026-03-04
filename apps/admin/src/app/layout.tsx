import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin Panel - Lumina Workspace",
  description: "Lumina Workspace 后台管理系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable}`}>
      <body className="antialiased min-h-screen text-slate-900 bg-[#FAFAFA]">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
