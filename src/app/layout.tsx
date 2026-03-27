
// // import type { Metadata } from "next";
// // import { Inter } from "next/font/google";
// // import "./globals.css";
// // import { SeoConfigProvider } from "../context/SeoConfigContext";
// // import SeoMeta from "../components/SeoMeta";
// // import DynamicScripts from "../components/DynamicScripts";
// // // import DynamicHeader from '../components/DynamicHeader';
// // // import DynamicFooter from '../components/DynamicFooter';

// // const inter = Inter({ subsets: ["latin"] });

// // // Default metadata (can be overridden by dynamic SEO config)


// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <html lang="en">
// //       <body className={inter.className}>
// //         <SeoConfigProvider>
// //           {/* SEO & tracking setup */}
// //           <SeoMeta />
// //           <DynamicScripts />

// //           {/* Dynamic branding header */}
// //           {/* <DynamicHeader /> */}

// //           {/* Your existing app content */}
// //           <main>{children}</main>

// //           {/* Dynamic branding footer */}
// //           {/* <DynamicFooter /> */}
// //         </SeoConfigProvider>
// //       </body>
// //     </html>
// //   );
// // }

















// import type { Metadata } from "next";
// import { headers } from "next/headers";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { SeoConfigProvider } from "../context/SeoConfigContext";
// import SeoMeta from "../components/SeoMeta";
// import DynamicScripts from "../components/DynamicScripts";

// const inter = Inter({ subsets: ["latin"] });

// /* 🔥 SERVER SIDE SEO FETCH */
// async function getSeoData(domain: string) {
//   try {
//     const res = await fetch(
//       `https://5cc5-103-16-29-36.ngrok-free.app/api/v1/seo-websites/domain/${domain}`,
//       {
//         headers: { "X-Tenant": "670a48b168b0640a262870c4" },
//         cache: "no-store",
//       }
//     );

//     return res.json();
//   } catch (e) {
//     return null;
//   }
// }

// /* 🔥 THIS IS WHAT GOOGLE CARES ABOUT */
// export async function generateMetadata(): Promise<Metadata> {
// const headersList = await headers();
// let domain = headersList.get("host") || "theartemis.ai";

//   if (domain.includes("localhost")) {
//     domain = "theartemis.ai";
//   }

//   const seo = await getSeoData(domain);

//   return {
//     metadataBase: new URL(`https://${domain}`),

//     title: seo?.title || "Artemis AI",
//     description: seo?.description || "AI-powered ATS platform",

//     keywords: seo?.keywords || ["ATS", "Recruitment"],

//     openGraph: {
//       title: seo?.title,
//       description: seo?.description,
//       url: `https://${domain}`,
//       siteName: "Artemis AI",
//       type: "website",
//     },

//     robots: {
//       index: true,
//       follow: true,
//     },

//     icons: {
//       icon: "/favicon.ico",
//     },
//   };
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <SeoConfigProvider>
//           {/* Client-side extras only */}
//           <SeoMeta />
//           <DynamicScripts />

//           <main>{children}</main>
//         </SeoConfigProvider>
//       </body>
//     </html>
//   );
// }
























import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import { SeoConfigProvider } from "../context/SeoConfigContext";
import SeoMeta from "../components/SeoMeta";
import DynamicScripts from "../components/DynamicScripts";

const inter = Inter({ subsets: ["latin"] });

/**
 * Helper to get the current domain from request headers.
 * This function is async because `headers()` is async in Next.js 15+.
 */
async function getDomainFromHeaders(): Promise<string> {
  const headersList = await headers();
  let domain = headersList.get("host") || "theartemis.ai";
  // Normalise localhost / www to the base domain
  if (domain.includes("localhost")) {
    domain = "theartemis.ai";
  }
  return domain;
}

/**
 * Shared fetch for SEO data (used by both generateMetadata and the layout)
 */
async function fetchSeoData(domain: string) {
  try {
    const res = await fetch(
      `https://5cc5-103-16-29-36.ngrok-free.app/api/v1/seo-websites/domain/${domain}`,
      {
        headers: { "X-Tenant": "670a48b168b0640a262870c4" },
        cache: "no-store",
      }
    );
    return res.json();
  } catch (e) {
    return null;
  }
}

/**
 * Google‑facing metadata (used by Next.js for <head> tags)
 */
export async function generateMetadata(): Promise<Metadata> {
  const domain = await getDomainFromHeaders();
  const seo:any =  fetchSeoData(domain);

  return {
    metadataBase: new URL(`https://${domain}`),
    title: seo?.title || "Artemis AI",
    description: seo?.description || "AI-powered ATS platform",
    keywords: seo?.keywords || ["ATS", "Recruitment"],
    openGraph: {
      title: seo?.title,
      description: seo?.description,
      url: `https://${domain}`,
      siteName: "Artemis AI",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

/**
 * Root layout – server component.
 * Fetches SEO data and passes it to the client context to prevent hydration mismatches.
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const domain = await getDomainFromHeaders();
  const seoData = await fetchSeoData(domain);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Provide server‑fetched data to the client context */}
        <SeoConfigProvider initialConfig={seoData}>
          <SeoMeta />
          <DynamicScripts />
          <main>{children}</main>
        </SeoConfigProvider>
      </body>
    </html>
  );
}