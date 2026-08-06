This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Google Ads Property Lead Storage

The Google Ads property popup stores leads in the Hostinger MySQL/MariaDB database through the server-only `/api/ads-property-lead` endpoint. Create the table by running the contents of:

```bash
database/google_ads_property_leads.sql
```

Configure these server-only values locally in `.env.local` and in the Vercel project environment settings:

```bash
HOSTINGER_DB_HOST=srv1085.hstgr.io
HOSTINGER_DB_PORT=3306
HOSTINGER_DB_NAME=u272872204_whatsapp_leads
HOSTINGER_DB_USER=your_hostinger_database_user
HOSTINGER_DB_PASSWORD=your_hostinger_database_password
HOSTINGER_DB_SSL_MODE=required
```

Never prefix database credentials with `NEXT_PUBLIC_`. The SQL connection uses a small reusable pool suitable for Vercel serverless instances. Hostinger Remote MySQL must allow the Vercel function's outbound IP before production use.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
