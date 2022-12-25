interface FormRadioProps {
  id: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDefault?: boolean;
}

const FormRadio: React.FC<FormRadioProps> = ({
  id,
  name,
  value,
  isDefault = false,
  onChange,
}: FormRadioProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };

  return (
    <span>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        defaultChecked={isDefault}
      />
      <label className="mx-1.5" htmlFor={value}>
        {value}
      </label>
    </span>
  );
};

export default FormRadio;
