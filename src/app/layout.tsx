import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://suzuki-sales-website.vercel.app"),
  title: "Suzuki 汽車顧問｜張鈺漣",
  description:
    "Suzuki 汽車顧問張鈺漣 — 車款比較、預約試乘、購車諮詢與貸款試算，凱騰鈴木北投所。",
  openGraph: {
    title: "Suzuki 汽車顧問｜張鈺漣",
    description:
      "Suzuki 全車系 — 車款比較、預約試乘、購車諮詢、貸款試算。凱騰鈴木北投所。",
    type: "website",
    locale: "zh_TW",
    siteName: "Suzuki 汽車顧問 張鈺漣",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Suzuki 汽車顧問 張鈺漣",
      },
    ],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
