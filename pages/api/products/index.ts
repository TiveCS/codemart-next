import { authOptions } from './../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

type PostData = {
  title: string;
  categories: string[];
  price: number;
  description?: string;
  sourceFile: string;
  pictureFile: string;
  authorEmail: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        image_url: true,
        categories: true,
      },
    });

    res.status(200).json({
      count: products.length,
      products,
    });
  } else if (req.method === 'POST') {
    const {
      title,
      price,
      categories,
      description,
      sourceFile,
      pictureFile,
      authorEmail,
    }: PostData = req.body;

    const product = await prisma.product.create({
      data: {
        title,
        price,
        image_url: pictureFile,
        file_url: sourceFile,
        description,
        author: {
          connect: {
            email: authorEmail,
          },
        },
        categories: {
          connectOrCreate: categories.map((category) => ({
            where: { name: category },
            create: { name: category },
          })),
        },
      },
    });

    res.status(201).json({
      product,
    });
  }
}
