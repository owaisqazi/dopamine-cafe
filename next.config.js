/** @type {import('next').NextConfig} */

const tawkDomains = ["https://embed.tawk.to", "https://tawk.to"];

const ContentSecurityPolicy = `
  script-src 'self' 'unsafe-inline' 'unsafe-eval' ${tawkDomains.join(" ")};
  img-src 'self' data: blob: https:;
  font-src 'self' data: https:;
  connect-src 'self' https: wss://*.tawk.to;
  frame-src ${tawkDomains.join(" ")};
  frame-ancestors ${tawkDomains.join(" ")};
`;

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: ContentSecurityPolicy.replace(/\n/g, "") },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Powered-By", value: "" },
];

const nextConfig = {
  output: 'export',
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  modern: true,
  webpack: (config) => { 
    config.cache = false; 
    return config; 
  }
};

module.exports = nextConfig;
