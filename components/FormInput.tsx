import { HTMLInputTypeAttribute } from 'react';

export interface Props {
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTextArea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onClickTextArea?: (e: React.MouseEvent<HTMLTextAreaElement>) => void;
  accept?: string;
  required?: boolean;
  name?: string;
  value?: string | number | readonly string[] | undefined;
  isTextArea?: boolean;
  error?: string;
}

const FormInput: React.FC<Props> = ({
  id,
  name = id,
  type,
  placeholder,
  onChange,
  onClick,
  onChangeTextArea,
  onClickTextArea,
  accept,
  required = true,
  value,
  isTextArea = false,
  error,
}: Props) => {
  if (isTextArea)
    return (
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        className={
          'w-full px-4 py-3 text-sm border rounded-md appearance-none border-recandy-gray-50 h-60'
        }
        onChange={onChangeTextArea}
        onClick={onClickTextArea}
        required={required}
        value={value}
      />
    );

  return (
    <label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={
          'w-full px-4 py-3 text-sm border rounded-md appearance-none border-recandy-gray-50'
        }
        onChange={onChange}
        onClick={onClick}
        accept={accept}
        required={required}
        value={value}
      />
      <p className="text-sm text-red-500">{error}</p>
    </label>
  );
};

export default FormInput;
