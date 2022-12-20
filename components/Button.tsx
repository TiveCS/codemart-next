import classNames from 'classnames';

export interface Props {
  children: string | string[];
  type: 'primary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  textSize?: 'sm' | 'base' | 'lg';
  width?: 'normal' | 'full' | 'half' | 'quarter';

  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<Props> = (props) => {
  const classes = classNames({
    btn: true,
    'btn-primary': props.type === 'primary',
    'btn-outline': props.type === 'outline',
    'btn-text': props.type === 'text',

    'btn-w-full': props.width === 'full',
    'btn-w-half': props.width === 'half',
    'btn-w-quarter': props.width === 'quarter',

    'btn-size-sm': props.size === 'sm',
    'btn-size-md': props.size ? props.size === 'md' : true,
    'btn-size-lg': props.size === 'lg',

    'btn-text-sm': props.textSize === 'sm',
    'btn-text-md': props.textSize === 'base',
    'btn-text-lg': props.textSize === 'lg',
  });

  return (
    <button onClick={props.onClick} className={classes}>
      {props.children}
    </button>
  );
};

export default Button;
