import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const path = req.query.proxy;

  // If it's an array of path segments, join; otherwise use as string
  const fullPath = Array.isArray(path) ? path.join("/") : path;

  // LOCAL MODE BYPASS
  // When you're running `npm run dev`, do NOT proxy.
  if (process.env.NODE_ENV === "development") {
    res.status(400).json({
      error: "Proxy disabled in local development. Call backend directly.",
      hint: "Your local code still hits your backend directly because dev mode uses your existing setup."
    });
    return;
  }

  // PRODUCTION MODE (VERCEL) PROXY
  const backendUrl = `http://157.20.214.84:9292/${fullPath}`;

  try {
    const outgoingHeaders: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (key === "host" || value === undefined) continue;
      if (Array.isArray(value)) {
        outgoingHeaders[key] = value.join(", ");
      } else {
        outgoingHeaders[key] = String(value);
      }
    }

    const response = await fetch(backendUrl, {
      method: req.method,
      headers: outgoingHeaders,
      body: req.method === "GET" ? undefined : req.body
    });

    const text = await response.text();
    res.status(response.status).send(text);

  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy failed" });
  }
}
