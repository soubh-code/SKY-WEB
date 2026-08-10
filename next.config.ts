import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.googleadservices.com https://www.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://connect.facebook.net"
  : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com https://www.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://connect.facebook.net";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(self)",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://cdn.sanity.io https://www.google.com https://google.com https://www.google.co.in https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://www.googleadservices.com https://*.googleusercontent.com https://*.gstatic.com https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://sanity.io https://*.sanity.io https://www.google-analytics.com https://analytics.google.com https://www.google.com https://google.com https://stats.g.doubleclick.net https://pagead2.googlesyndication.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://ad.doubleclick.net https://www.googletagmanager.com https://www.facebook.com https://connect.facebook.net",
      "frame-src https://www.google.com https://www.googletagmanager.com https://sanity.io https://*.sanity.io",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/residential-projects/lajpat-nagar-new-delhi-unit-1-2",
        destination: "/projects/lajpat-nagar-1-2",
        permanent: true,
      },
      {
        source: "/projects/lajpat-nagar-1-2-4",
        destination: "/projects/lajpat-nagar-1-2",
        permanent: true,
      },
      {
        source: "/projects/lajpat-nagar-3",
        destination: "/projects/lajpat-nagar-3-4",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
