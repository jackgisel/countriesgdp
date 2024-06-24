import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from 'next/image';
import "./globals.css";
import logo from '../public/icon.svg'
import Link from "next/link";
import PlausibleProvider from 'next-plausible'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Countries GDP - All Countries",
  description: "Visualized and understandable GDP for each country",
  openGraph: {
    images: [logo]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PlausibleProvider domain="countriesgdp.com">
          <section className="flex flex-row items-center">
            <Image priority alt="CountriesGDP logo" src={logo} height={48}
        width={48} className="m-4" />
            <Link href="/"><h1 className="text-4xl font-bold">Countries GDP</h1></Link>
          </section>
          <main className="flex min-h-screen flex-col items-center justify-between lg:px-24">
            {children}
          </main>
          <footer className="px-24 py-12">
            <p className="text-center">
              the data shown here comes from <a className="font-semibold" href="https://data.worldbank.org/indicator/NY.GDP.MKTP.CD">World Bank Group</a>. we don&apos;t have any affiliation with them.
            </p>
          </footer>
        </PlausibleProvider>
      </body>
    </html>
  );
}
