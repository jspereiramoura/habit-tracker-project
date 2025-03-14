import { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import MSWConfig from "../context/mswConfig";
import ReduxProvider from "../redux/provider";
import "./globals.css";
import Modal from "./_components/modal";

const roboto = Roboto({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-roboto"
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${roboto.variable} overflow-x-hidden`}
      >
        <MSWConfig>
          <ReduxProvider>
            <Modal />
            {children}
          </ReduxProvider>
        </MSWConfig>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Acompanhe seus hábitos e alcance seus objetivos!",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" }
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192"
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512"
      }
    ]
  }
};
