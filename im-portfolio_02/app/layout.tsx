import SpaceCanvas from "@/components/SpaceCanvas";
import "@/style/global.scss";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IM_PORTFOLIO",
  description:
    "유지 보수를 고려하여 공통적인 UI컴포넌트를 사용하였으며, 지속적인 업데이트를 위해 Firestore를 활용하여 데이터를 추가할 수 있는 포트폴리오",
  keywords: [
    "포트폴리오",
    "프론트엔드",
    "portfolio",
    "frontend",
    "fe",
    "dev",
    "developer",
  ],
  robots: {
    index: true,
    follow: true,
    noindex: false,
    nofollow: false,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpaceCanvas />
        {children}
      </body>
    </html>
  );
}
