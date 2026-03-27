// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   type ReactNode,
// } from "react";
// import axios from "axios";
// import type { SeoWebsite } from "../types/SeoConfigTypes";

// interface SeoConfigContextType {
//   config: SeoWebsite | null;
//   loading: boolean;
// }

// const SeoConfigContext = createContext<SeoConfigContextType>({
//   config: null,
//   loading: true,
// });

// export const SeoConfigProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [config, setConfig] = useState<SeoWebsite | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchConfig = async () => {
//       try {
//         // Get current domain from window location
//         let currentDomain = window.location.hostname;
//         if (currentDomain === "localhost"|| currentDomain === "www.theartemis.ai") {
//           currentDomain = "theartemis.ai";
//         }

//         const response = await axios.get<SeoWebsite>(
//           `https://5cc5-103-16-29-36.ngrok-free.app/api/v1/seo-websites/domain/${currentDomain}`,
//           { headers: { "X-Tenant": "670a48b168b0640a262870c4" } }
//         );

//         if (response.data) {
//           setConfig(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching SEO configuration:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchConfig();
//   }, []);

//   return (
//     <SeoConfigContext.Provider value={{ config, loading }}>
//       {children}
//     </SeoConfigContext.Provider>
//   );
// };

// export const useSeoConfig = (): SeoConfigContextType =>
//   useContext(SeoConfigContext);























"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import type { SeoWebsite } from "../types/SeoConfigTypes";

interface SeoConfigContextType {
  config: SeoWebsite | null;
  loading: boolean;
}

const SeoConfigContext = createContext<SeoConfigContextType>({
  config: null,
  loading: true,
});

export const SeoConfigProvider: React.FC<{
  children: ReactNode;
  initialConfig?: SeoWebsite | null; // received from server
}> = ({ children, initialConfig }) => {
  // If we got initial data from the server, use it immediately.
  const [config, setConfig] = useState<SeoWebsite | null>(initialConfig || null);
  const [loading, setLoading] = useState<boolean>(!initialConfig);

  useEffect(() => {
    // Only fetch on client if we don't have initial data
    if (initialConfig) return;

    const fetchConfig = async () => {
      try {
        let currentDomain = window.location.hostname;
        if (currentDomain === "localhost" || currentDomain === "www.theartemis.ai") {
          currentDomain = "theartemis.ai";
        }

        const response = await axios.get<SeoWebsite>(
          `https://5cc5-103-16-29-36.ngrok-free.app/api/v1/seo-websites/domain/${currentDomain}`,
          { headers: { "X-Tenant": "670a48b168b0640a262870c4" } }
        );

        if (response.data) {
          setConfig(response.data);
        }
      } catch (error) {
        console.error("Error fetching SEO configuration:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [initialConfig]);

  return (
    <SeoConfigContext.Provider value={{ config, loading }}>
      {children}
    </SeoConfigContext.Provider>
  );
};

export const useSeoConfig = (): SeoConfigContextType =>
  useContext(SeoConfigContext);