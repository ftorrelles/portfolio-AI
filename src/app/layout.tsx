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
  title: "Francisco Torrelles | AI-Augmented Developer",
  description: "Portafolio profesional de Francisco Torrelles, especializado en desarrollo web y soluciones con IA.",
  icons: {
    icon: "/logTag.svg",
  },
  openGraph: {
    title: "Francisco Torrelles | AI-Augmented Developer",
    description: "Portafolio profesional de Francisco Torrelles, especializado en desarrollo web y soluciones con IA.",
    url: "https://my-portfolio-ft.netlify.app/",
    siteName: "Francisco Torrelles Portfolio",
    images: [
      {
        url: "/logTag.svg",
        width: 800,
        height: 600,
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Francisco Torrelles | AI-Augmented Developer",
    description: "Portafolio profesional de Francisco Torrelles, especializado en desarrollo web y soluciones con IA.",
    images: ["/logTag.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-nex-black text-white">{children}</body>
    </html>
  );
}
