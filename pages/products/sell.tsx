import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import FormRadio from '../../components/FormRadio';
import UploadFile from '../../components/pages/Sell/UploadFile';

export default function SellPage() {
  const { data: session, status } = useSession();
  const [sourceFileResource, setSourceFileResource] = useState<string>('URL');

  const [fileUrl, setFileUrl] = useState<{
    picture?: string;
    source?: string;
  }>({});

  const [title, setTitle] = useState<string>('');
  const [categories, setCategories] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const handleGetFileUrl = (name: string, url: string) => {
    setFileUrl({ ...fileUrl, [name]: url });
  };

  const handleSourceFileResource = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSourceFileResource(e.target.value);
  };

  const handleSubmit = async () => {
    const cat = categories.split(',').map((c) => c.trim());

    const payload = {
      title,
      categories: cat,
      pictureFile: fileUrl['picture'],
      sourceFile: fileUrl['source'],
      price,
      description,
      authorEmail: session?.user?.email,
    };

    const response = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <>
      <Head>
        <title>CodeMart - Sell</title>
      </Head>
      <div className="grid max-w-6xl grid-flow-row px-16 py-24 mx-auto gap-y-8">
        <div className="grid grid-flow-col gap-16">
          <label htmlFor="title">
            <p className="text-lg font-medium">Title</p>
            <FormInput
              id="title"
              type={'text'}
              placeholder={'Awesome app'}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label htmlFor="categories">
            <p className="text-lg font-medium">Categories</p>
            <FormInput
              id="categories"
              type={'text'}
              placeholder={'HTML, PHP, CSS, JavaScript'}
              onChange={(e) => setCategories(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <p className="text-lg font-medium">Application Picture</p>
          <UploadFile
            name="picture"
            accept="image/*"
            title=""
            onGetUrl={handleGetFileUrl}
          />
        </div>

        <div className="flex flex-col my-4">
          <p className="mb-4 text-lg font-medium">Upload Source File</p>
          <div className="flex flex-row mb-4 space-x-6">
            <p>Source file resource:</p>
            <FormRadio
              id="file"
              name="source"
              value="File"
              onChange={handleSourceFileResource}
            />
            <FormRadio
              id="url"
              name="source"
              value="URL"
              onChange={handleSourceFileResource}
              isDefault
            />
          </div>
          <div className="grid items-end grid-flow-col">
            {sourceFileResource === 'File' && (
              <UploadFile
                name="source"
                accept=".zip,.rar,.7z"
                title=""
                onGetUrl={handleGetFileUrl}
              />
            )}

            {sourceFileResource === 'URL' && (
              <label htmlFor="source">
                <span>Source File URL</span>
                <FormInput
                  id="source"
                  type={'text'}
                  placeholder={'https://github.com/john/awesome-app'}
                  onChange={(e) => handleGetFileUrl('source', e.target.value)}
                />
              </label>
            )}
          </div>
        </div>

        <div className="max-w-xs">
          <label htmlFor="price">
            <p className="mb-4 text-lg font-medium">Price</p>
            <FormInput
              id="price"
              type={'number'}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </label>
        </div>

        <label htmlFor="description">
          <p className="mb-4 text-lg font-medium">Description</p>
          <FormInput
            id="description"
            type={'text'}
            onChange={(e) => setDescription(e.target.value)}
            isTextArea
          />
        </label>

        <Button width="fit" type="primary" onClick={handleSubmit} textSize="sm">
          Submit
        </Button>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: '/auth/signin',
      },
      props: {},
    };

  return {
    props: {},
  };
};
