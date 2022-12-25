import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { S3 } from 'aws-sdk';
import fs from 'fs';
import formidable from 'formidable';

const s3 = new S3({
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
): Promise<{
  fields: formidable.Fields;
  files: formidable.Files;
}> => {
  const form = formidable();

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) reject(err);
      if (!files.file) reject();

      resolve({ fields, files });
    });
  });
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method !== 'POST')
    res.status(405).json({ message: 'Method is not allowed' });

  const { files } = await readFile(req);

  const file: any = files.file;

  await s3
    .upload({
      Bucket: process.env.S3_BUCKET_NAME as string,
      Key: file.originalFilename,
      Body: fs.createReadStream(file.filepath),
      ACL: 'private',
      ContentType: file.type,
      ContentDisposition: 'inline',
    })
    .promise();

  const url = await s3.getSignedUrlPromise('getObject', {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: file.originalFilename,
    Expires: 60 * 60 * 24 * 7 * 4, // 1 month
  });

  res.json({ url });
};

export default handler;
