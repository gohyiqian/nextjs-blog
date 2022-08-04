This is a starter template for [Learn Next.js](https://nextjs.org/learn).

Tech Stack

- Next.js
- CSS modules
- Tailwind
- TypeScript
- gray-matter (let us parse the metadata in each markdown file)
- SWR (stale-while-revalidate, a react hooks for data fetching)
- MDX (allows us to use JSX in markdown)
- remark (render markdown content by converting markdown to html string)
- date-fns (format date)

npm installations

```
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
npm install classnames
npm install -D tailwindcss autoprefixer postcss
npm install -D sass
npm install swr
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
