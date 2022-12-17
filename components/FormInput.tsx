import { HTMLInputTypeAttribute } from 'react';

export interface Props {
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
}

const FormInput: React.FC<Props> = ({ id, type, placeholder }: Props) => {
  return (
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 text-sm border rounded-md border-recandy-gray-50"
    />
  );
};

export default FormInput;
