import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Button from '../../Button';
import ProgressBar from './ProgressBar';

export interface UploadFileProps {
  name: string;
  accept?: string;
  placeholder?: string;
  title?: string;
  onGetUrl: (name: string, url: string) => void;
}

const maxFileSizeInMB = 5;
const maxFileSize = 1024 * 1024 * maxFileSizeInMB;

const UploadFile = ({
  accept,
  placeholder = 'Select File',
  title = 'Upload File',
  name,
  onGetUrl,
}: UploadFileProps) => {
  const isImage = accept?.includes('image');

  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (file.size > maxFileSize) {
        alert(`File size is too large (max ${maxFileSizeInMB}MB)`);
        setFile(undefined);
        return;
      }

      setUrl(URL.createObjectURL(file));
      setFile(file);
    }
  };

  useEffect(() => {
    const upload = async () => {
      const formData = new FormData();
      const fileBlob: Blob = file as Blob;
      formData.append('file', fileBlob);

      setUploading(true);
      const { data } = await axios.post('/api/aws/upload', formData, {
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;

          const percentage = (progressEvent.loaded * 100) / progressEvent.total;

          setProgress(+percentage.toFixed(2));
          console.log(
            'Upload progress (',
            fileBlob.name,
            ') : ',
            percentage,
            '%',
          );
        },
      });
      setUploading(false);
      onGetUrl(name, data.url);
      setFile(undefined);

      console.log(data);
    };

    if (file) upload();
  }, [file, name, onGetUrl, url]);

  return (
    <div className="grid grid-flow-row gap-4 max-w-fit">
      <label className="max-w-fit">
        <p className="mb-2 text-sm">
          {title} (max size: {maxFileSizeInMB}MB)
        </p>
        <input
          name={name}
          type="file"
          hidden={isImage}
          accept={accept}
          onChange={handleFileChange}
          disabled={uploading}
          style={{ opacity: uploading ? '.5' : '1' }}
          className={isImage ? '' : 'text-sm'}
        />

        {isImage && (
          <div
            style={{
              cursor: uploading ? 'not-allowed' : 'pointer',
            }}
            className="flex items-center justify-center border-2 border-dashed rounded w-72 aspect-video"
          >
            {accept?.startsWith('image') && url ? (
              <img src={url} alt="" />
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
        )}

        {isImage && <p className="text-xs">{file?.name}</p>}
      </label>

      {uploading && <ProgressBar progress={progress} />}
    </div>
  );
};

export default UploadFile;
