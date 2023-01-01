import { Product } from '@prisma/client';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export type ProductWithAuthor = Product & { author: { name: string | null } };

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { id } = req.query;
  const { method } = req;

  switch (method) {
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
          },
        },
      );

      res.status(200).json({ product });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
