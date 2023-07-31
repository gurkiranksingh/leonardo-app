
## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Purpose

This is a single page app which uses the following:
- NextAuth: Uses GoogleProvider and Prisma adapter to retain session information in a Supabase hosted postgres database
- ChakraUI: Used for welcome Modal & Tabs - which also allow the user to input their username & title, as well as save this information to the database
- AniList API: Publicly available graphql API used to fetch some data and render on landing page when the user is logged in
