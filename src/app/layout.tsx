import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UPI QR Code Generator | Create & Share Payment QR Codes Easily",
  description:
    "Generate a secure UPI payment QR code by entering your UPI ID and amount. Easily download or share the QR code for seamless transactions.",
  keywords: [
    "UPI QR Code Generator",
    "Create UPI QR Code",
    "UPI Payment QR Code",
    "Generate QR Code for UPI",
    "UPI Payment Link Generator",
    "UPI QR Code Download",
    "UPI QR Share",
    "QR Code for UPI Payments",
    "Scan & Pay QR Code",
    "Generate UPI QR Online",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
