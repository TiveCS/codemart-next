import Image from 'next/image';

export interface Props {
  title: string;
  description: string;
  icon: any;
}

const FeaturesPoint: React.FC<Props> = ({
  title,
  description,
  icon,
}: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-4">
        <Image src={icon} alt={title} />

        <h4 className="text-2xl font-medium">{title}</h4>
      </div>

      <p className="leading-relaxed">{description}</p>
    </div>
  );
};

export default FeaturesPoint;
