export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'secondary-alt'
  | 'sync';

export function Button({
  text,
  type,
  onClick,
  classes = [],
  disabled,
}:{
  text: string;
  type: ButtonType;
  onClick: (args: any) => void;
  classes?: string[];
  disabled?: boolean;
}) {
  const classNames = [...classes, `button--${type}`, 'button'];
  const className = classNames.join(' ');

  return (
    <button className={className} onClick={onClick} disabled={disabled}>{text}</button>
  );
}
