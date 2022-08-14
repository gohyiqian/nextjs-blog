This is a starter template for [Learn Next.js](https://nextjs.org/learn).

Tech Stack

- Next.js - React Framework
- CSS modules
- Prisma - ORM
- tRPC
- Tailwind
- TypeScript
- Docker
- gray-matter (let us parse the metadata in each markdown file)
- SWR (stale-while-revalidate, a vercel react hooks for data fetching)
- MDX (allows us to use JSX in markdown)
- remark (render markdown content by converting markdown to html string)
- date-fns (format date)

npm installations

```
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
npm install classnames
npm install -D tailwindcss autoprefixer postcss
npm install -D typescript ts-node @types/react @types/node
npm install -D sass
npm install swr
touch tsconfig.json OR tsc --init
touch next-env.d.ts (ensures Next.js types are picked up by the TypeScript compiler.)
```

Next.js compiles CSS using `PostCSS.`

Next.js 2 forms of Pre-rendering. The difference is in when it generates the HTML for a page.

- Static Generation (with vs without data) (use whenever possible as it is fast. Once build, will be served by CDN)
- Server-side Rendering (use when the data needs to be up-to-date with every request)

By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.

Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called `hydration.`)

`Static Generation` is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
`Server-side Rendering` is the pre-rendering method that generates the HTML on each request.

### getStaticProps

use for Static Generation with Data

Essentially, getStaticProps allows you to tell Next.js: `“Hey, this page has some data dependencies — so when you pre-render this page at build time, make sure to resolve them first!”`

```javascript
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

In development (npm run dev or yarn dev), `getStaticProps runs on every request`.
In production, `getStaticProps runs at build time.` However, this behavior can be enhanced using the fallback key returned by getStaticPaths

`getStaticProps` only runs on the server-side.

`getStaticProps` can only be exported from a page. You can’t export it from non-page files. Reason being React needs to have all the required data before the page is rendered.

### Dynamic URLS

Page Path Depends on External Data.
Pages that begin with '[' and end with ']' are dynamic routes in Next.js.

### Catch-all Routes

Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets.

For example:
`pages/posts/[...id].js` matches `/posts/a`, but also `/posts/a/b`, `/posts/a/b/c` and so on.

Do Not Fetch an API Route from getStaticProps or getStaticPaths

### Prisma

```
npm install @prisma/cli --save-dev
npm install prisma typescript ts-node @types/node --save-dev
npm install @prisma/client
npx prisma init (Set up a new Prisma project)
npx prisma migrate dev --name init (Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client))
npx prisma db push (Push the Prisma schema state to the database)
npx prisma introspect (Populate your Prisma schema file with Prisma models)
npx prisma generate (Generate artifacts (e.g. Prisma Client)
npx prisma studio (Launch GUI to browse your data)
npx prisma pull (Pull the schema from an existing database, updating the Prisma schema)
npx prisma db seed (seed the database)
```

### Install Tailwind CSS

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Docker

```Dockerfile
docker-compose up
docker-compose down #to avoid background processes on your computer.
```

### Schema for PostgreSQL

```javaScript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRESQL_DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement()) @map("_id")
  name  String?
  email String  @unique
  posts Post[]
}

model Post {
  id        Int      @id @default(autoincrement()) @map("_id")
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  viewCount Int      @default(0)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
}
```

### Schema for MongoDB

```javaScript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("MONGODB_DATABASE_URL")
}

model User {
  id    String     @id @default(auto()) @map("_id") @db.ObjectId
  name  String?
  email String  @unique
  posts Post[]
}

model Post {
  id        String      @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  viewCount Int      @default(0)
  author    User?     @relation(fields: [authorId], references: [id])
  authorId  String?
}

```

### Miscellanouse

```
// delete npm dependencies
rm -rf node_modules
```

### Test with Express Server

```
npm i express
npm i -D @types/express ts-node
```
