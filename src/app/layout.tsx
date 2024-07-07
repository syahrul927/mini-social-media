import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./components/header";
import NextAuthProvider from "./context/nextauth-provider";

export const metadata: Metadata = {
  title: "Mini Social Media",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <NextAuthProvider>
          <Header />
          <main className="flex min-h-screen flex-col items-center bg-white">
            <div className="container flex w-full justify-center">
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </div>
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
