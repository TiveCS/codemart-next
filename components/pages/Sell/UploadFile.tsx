import axios from 'axios';
import { useState } from 'react';
import Button from '../../Button';
import ProgressBar from './ProgressBar';

export interface Props {
  name: string;
  accept?: string;
  placeholder?: string;
  title?: string;
  onGetUrl: (name: string, url: string) => void;
}

const UploadFile: React.FC<Props> = ({
  accept,
  placeholder = 'Select File',
  title = 'Upload File',
  name,
  onGetUrl,
}: Props) => {
  const isImage = accept?.includes('image');

  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState<string>();
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (file.size > 1024 * 1024 * 5) {
        alert('File size is too large (max 5MB)');
        setFile(undefined);
        return;
      }

      setUrl(URL.createObjectURL(file));
      setFile(file);
      setUploaded(false);
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post('/api/aws/upload', formData, {
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;

          const percentage = (progressEvent.loaded * 100) / progressEvent.total;

          setProgress(+percentage.toFixed(2));
          console.log('Upload progress (', file.name, ') : ', percentage, '%');
        },
      });

      console.log(data);

      onGetUrl(name, data.url);
      setUploaded(true);
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  return (
    <div className="grid grid-flow-row gap-4 max-w-fit">
      <label className="max-w-fit">
        <p className="mb-2 text-sm">{title}</p>
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
          <div className="flex items-center justify-center border-2 border-dashed rounded cursor-pointer w-72 aspect-video">
            {accept?.startsWith('image') && url ? (
              <img src={url} alt="" />
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
        )}

        {isImage && <p className="text-xs">{file?.name}</p>}
      </label>

      {uploading ? (
        <ProgressBar progress={progress} />
      ) : (
        <Button
          onClick={handleUpload}
          disabled={!file || uploading || uploaded}
          style={{ opacity: uploading ? '.5' : '1' }}
          type={!file || uploading || uploaded ? 'disabled' : 'primary'}
          textSize="sm"
        >
          Upload
        </Button>
      )}
    </div>
  );
};

export default UploadFile;
