import prisma from '../lib/prisma';
import express, { Request, Response } from 'express';
// import next from 'next';

const app = express();
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();
const port = process.env.PORT || 5000;

app.use(express.json());

// (async () => {
//   try {
//     await app.prepare();
//     const server = express();
//     server.all('*', (req: Request, res: Response) => {
//       return handle(req, res);
//     });
//     server.listen(port, (err?: any) => {
//       if (err) throw err;
//       console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
//     });
//   } catch (e) {
//     console.error(e);
//     process.exit(1);
//   }
// })();

app.get('/users', async (req: Request, res: Response) => {
  const result = await prisma.user.findMany();
  res.json(result);
});

app.post(`/signup`, async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const result = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.json(result);
});

app.post(`/post`, async (req: Request, res: Response) => {
  const { title, content, authorEmail } = req.body;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    },
  });
  res.json(result);
});

app.put('/post/:id/views', async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  });
  res.json(result);
});

app.put('/publish/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.post.update({
    where: { id },
    data: {
      published: true,
    },
  });
  res.json(result);
});

// Fetches the unpublished posts of a specific user.
app.get('/user/:id/drafts', async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.user
    .findUnique({
      where: { id },
    })
    .posts({
      where: {
        published: false,
      },
    });
  res.json(result);
});

app.get(`/post/:id`, async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.post.findUnique({
    where: { id },
  });
  res.json(result);
});

/**
 * Fetches all published posts and optionally paginates and/or filters
 * them by checking whether the search string appears in either title or content.
 */
app.get('/feed', async (req: Request, res: Response) => {
  const { searchString, skip, take } = req.query;
  const or = searchString
    ? {
        OR: [
          { title: { contains: searchString as string } },
          { content: { contains: searchString as string } },
        ],
      }
    : {};

  const result = await prisma.post.findMany({
    where: {
      published: true,
      ...or,
    },
    skip: Number(skip) || undefined,
    take: Number(take) || undefined,
  });
  res.json(result);
});

app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`)
);
