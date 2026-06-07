import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://suzuki-taipei.com"),
  title: "Suzuki 汽車顧問｜張鈺漣 — 凱騰鈴木北投所 新車諮詢・試乘預約",
  description:
    "Suzuki 全車系（e VITARA・SWIFT・Jimny・VITARA・S-CROSS・CARRY）車款比較、預約試乘、購車諮詢與貸款試算。凱騰鈴木北投所｜張鈺漣 0987-629-773",
  openGraph: {
    title: "Suzuki 汽車顧問｜張鈺漣",
    description:
      "Suzuki 全車系 — e VITARA・SWIFT・Jimny・VITARA・S-CROSS・CARRY 車款比較、預約試乘、購車諮詢、貸款試算。凱騰鈴木北投所。",
    url: "https://suzuki-taipei.com",
    type: "website",
    locale: "zh_TW",
    siteName: "Suzuki 汽車顧問 張鈺漣",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Suzuki 汽車顧問 張鈺漣 — 凱騰鈴木北投所",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          name: "凱騰鈴木 Suzuki 北投所",
          description:
            "Suzuki 汽車新車銷售、車款比較、試乘預約、購車諮詢、貸款保險試算",
          url: "https://suzuki-taipei.com",
          telephone: "+886987629773",
          email: "",
          image: "https://suzuki-taipei.com/og-image.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: "承德路六段337號",
            addressLocality: "台北市",
            addressRegion: "北投區",
            postalCode: "112",
            addressCountry: "TW",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 25.1172,
            longitude: 121.5054,
          },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "21:00",
          },
          priceRange: "$$",
          sameAs: [
            "https://www.facebook.com/profile.php?id=100092443294776",
            "https://www.threads.net/@lian____06",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+886987629773",
            contactType: "sales",
            availableLanguage: ["zh-TW"],
            contactOption: "TollFree",
          },
          areaServed: "台北市北投區",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Suzuki 全車系",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: "e VITARA",
                  description: "純電休旅，續航 516km，ALLGRIP-e 四驅",
                  brand: { "@type": "Brand", name: "Suzuki" },
                  offers: {
                    "@type": "Offer",
                    price: "1150000",
                    priceCurrency: "TWD",
                    availability: "https://schema.org/InStock",
                  },
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: "SWIFT",
                  description: "日本進口輕油電小車，24.5km/L 油耗",
                  brand: { "@type": "Brand", name: "Suzuki" },
                  offers: {
                    "@type": "Offer",
                    price: "730000",
                    priceCurrency: "TWD",
                    availability: "https://schema.org/InStock",
                  },
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: "Jimny",
                  description: "硬派越野，梯形大樑 4WD 加力箱",
                  brand: { "@type": "Brand", name: "Suzuki" },
                  offers: {
                    "@type": "Offer",
                    price: "849000",
                    priceCurrency: "TWD",
                    availability: "https://schema.org/InStock",
                  },
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: "VITARA",
                  description: "都會休旅，ALLGRIP 四驅 1.4L BOOSTJET 渦輪",
                  brand: { "@type": "Brand", name: "Suzuki" },
                  offers: {
                    "@type": "Offer",
                    price: "1040000",
                    priceCurrency: "TWD",
                    availability: "https://schema.org/InStock",
                  },
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: "S-CROSS",
                  description: "跨界休旅，440L 行李廂 48V 輕油電",
                  brand: { "@type": "Brand", name: "Suzuki" },
                  offers: {
                    "@type": "Offer",
                    price: "980000",
                    priceCurrency: "TWD",
                    availability: "https://schema.org/InStock",
                  },
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: "CARRY",
                  description: "商用貨車，同級最強載重 915kg",
                  brand: { "@type": "Brand", name: "Suzuki" },
                  offers: {
                    "@type": "Offer",
                    price: "499000",
                    priceCurrency: "TWD",
                    availability: "https://schema.org/InStock",
                  },
                },
              },
            ],
          },
        },
      ],
    }),
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
