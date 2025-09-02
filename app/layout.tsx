import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

import ModalProvider from "@/providers/modal-provider";
import { ReduxProvider } from "@/providers/redux-provider";
import { ToasterProvider } from "@/providers/toast-provider";

const fonts = Urbanist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={fonts.className}
      >
        <ReduxProvider>
          <ModalProvider/>
          <ToasterProvider/>
          <Navbar/>
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
