import prisma from '../../lib/prisma';

export default async function handle(req, res) {
  const user = await prisma.user.findMany();
  res.json(user);
}
