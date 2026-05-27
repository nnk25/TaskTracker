# TaskTracker

Very small task tracking app (Next.js + Prisma + NextAuth).

## Project overview
- Frontend: Next.js app in the `app/` folder
- API routes under `app/api/` using Prisma for DB access
- Authentication with `next-auth`

## Local setup
1. Install dependencies

```bash
pnpm install
```

2. Create a `.env` file in the project root with the required environment variables (see below).

3. Generate Prisma client

```bash
pnpm prisma generate
```

4. (Optional) Run migrations (if you have migrations):

```bash
pnpm prisma migrate dev
```

5. Run the development server

```bash
pnpm dev
```

## Required environment variables
Add the following to your `.env` (example values shown):

```
DATABASE_URL="postgresql://user:pass@localhost:5432/taskdb"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="a_long_random_secret"
GITHUB_ID="your_github_oauth_client_id"
GITHUB_SECRET="your_github_oauth_client_secret"
```

## Useful scripts
- `pnpm dev` — start Next.js in development
- `pnpm build` — build for production
- `pnpm start` — start production server
- `pnpm lint` — run ESLint

## Notes
- The project uses Prisma client generated under `app/generated/prisma`.
- If you update the Prisma schema, run `pnpm prisma generate` again.
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
