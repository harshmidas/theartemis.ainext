
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SeoConfigProvider } from "../context/SeoConfigContext";
import SeoMeta from "../components/SeoMeta";
import DynamicScripts from "../components/DynamicScripts";
// import DynamicHeader from '../components/DynamicHeader';
// import DynamicFooter from '../components/DynamicFooter';

const inter = Inter({ subsets: ["latin"] });

// Default metadata (can be overridden by dynamic SEO config)


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SeoConfigProvider>
          {/* SEO & tracking setup */}
          <SeoMeta />
          <DynamicScripts />

          {/* Dynamic branding header */}
          {/* <DynamicHeader /> */}

          {/* Your existing app content */}
          <main>{children}</main>

          {/* Dynamic branding footer */}
          {/* <DynamicFooter /> */}
        </SeoConfigProvider>
      </body>
    </html>
  );
}












