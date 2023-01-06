import { Product } from '@prisma/client';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export type ProductWithAuthor = Product & {
  author: { name: string | null };
  categories: { name: string }[];
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { id } = req.query;
  const { method } = req;

  switch (method) {
    case 'DELETE':
      // Delete data from your database

      const deletedProduct = await prisma.product.delete({
        where: { id: Number(id) },
        select: {
          id: true,
          title: true,
        },
      });
      res.status(200).json({ deletedProduct });
      break;
    case 'GET':
      // Get data from your database
      const product: ProductWithAuthor | null = await prisma.product.findUnique(
        {
          where: {
            id: Number(id),
          },
          include: {
            author: {
              select: {
                name: true,
              },
            },
            categories: {
              select: {
                name: true,
              },
            },
          },
        },
      );

      res.status(200).json({ product });
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
