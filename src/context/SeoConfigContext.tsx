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

export const SeoConfigProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<SeoWebsite | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        // Get current domain from window location
        let currentDomain = window.location.hostname;
        if (currentDomain === "localhost") {
          currentDomain = "theartemis.ai";
        }

        const response = await axios.get<SeoWebsite>(
          `/api/v1/seo-websites/domain/theartemis.ai`,
          { headers: { "X-Tenant": "68b20dd0fb42964f2328b424" } }
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
  }, []);

  return (
    <SeoConfigContext.Provider value={{ config, loading }}>
      {children}
    </SeoConfigContext.Provider>
  );
};

export const useSeoConfig = (): SeoConfigContextType =>
  useContext(SeoConfigContext);

// 'use client';

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

// interface SeoConfigProviderProps {
//   children: ReactNode;
//   initialConfig?: SeoWebsite; // 👈 allow optional prop
// }

// const SeoConfigContext = createContext<SeoConfigContextType>({
//   config: null,
//   loading: true,
// });

// export const SeoConfigProvider: React.FC<SeoConfigProviderProps> = ({
//   children,
//   initialConfig,
// }) => {
//   const [config, setConfig] = useState<SeoWebsite | null>(
//     initialConfig || null
//   );
//   const [loading, setLoading] = useState<boolean>(!initialConfig);

//   useEffect(() => {
//     if (initialConfig) return; // 👈 if you already have config, skip fetching

//     const fetchConfig = async () => {
//       try {
//         let currentDomain = window.location.hostname;
//         if (currentDomain === "localhost") {
//           currentDomain = "theartemis.ai";
//         }

//         const response = await axios.get<SeoWebsite>(
//           `/api/v1/seo-websites/domain/${currentDomain}`,
//           { headers: { "X-Tenant": "68b20dd0fb42964f2328b424" } }
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
//   }, [initialConfig]);

//   return (
//     <SeoConfigContext.Provider value={{ config, loading }}>
//       {children}
//     </SeoConfigContext.Provider>
//   );
// };

// export const useSeoConfig = (): SeoConfigContextType =>
//   useContext(SeoConfigContext);
