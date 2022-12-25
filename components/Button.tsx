import classNames from 'classnames';
import { CSSProperties } from 'react';

export interface Props {
  children: string | string[];
  type: 'primary' | 'outline' | 'text' | 'disabled';
  size?: 'sm' | 'md' | 'lg';
  textSize?: 'sm' | 'base' | 'lg';
  width?: 'normal' | 'full' | 'half' | 'quarter' | 'fit';
  disabled?: boolean;
  id?: string;
  name?: string;
  style?: CSSProperties;

  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<Props> = (props) => {
  const classes = classNames({
    btn: true,
    'btn-primary': props.type === 'primary',
    'btn-outline': props.type === 'outline',
    'btn-text': props.type === 'text',
    'btn-disabled': props.type === 'disabled',

    'btn-w-full': props.width === 'full',
    'btn-w-half': props.width === 'half',
    'btn-w-quarter': props.width === 'quarter',
    'btn-w-fit': props.width === 'fit',

    'btn-size-sm': props.size === 'sm',
    'btn-size-md': props.size ? props.size === 'md' : true,
    'btn-size-lg': props.size === 'lg',

    'btn-text-sm': props.textSize === 'sm',
    'btn-text-md': props.textSize === 'base',
    'btn-text-lg': props.textSize === 'lg',
  });

  return (
    <button
      onClick={props.onClick}
      id={props.id}
      name={props.name}
      className={classes}
      disabled={props.disabled ?? false}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

export default Button;
