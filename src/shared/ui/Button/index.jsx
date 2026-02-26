import cn from 'classnames';
import style from './style.module.css';

export const Button = ({
  onClick,
  children,
  variant = 'primary', // primary, outline, ghost
  className,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(style.btn, style[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
