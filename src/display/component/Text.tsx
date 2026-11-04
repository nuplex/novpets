import type {IconPosition} from "../types.ts";
import type {ReactNode} from "react";

export function TextWithIcon({
  text,
  classes = [],
  textClasses = [],
  icon,
  iconPosition = 'left',
  onClick,
}:{
  text: ReactNode;
  classes?: string[];
  textClasses?: string[];
  icon: ReactNode;
  iconPosition: IconPosition;
  onClick?: () => void;
}) {
  const classNames = classes.length > 0 ? classes : ["icon-text"];
  const className = classNames.join(" ");

  return (
    <div className={className} onClick={onClick}>
      {iconPosition === 'left' ? icon : null}
      <span className={textClasses.join(' ')}>{text}</span>
      {iconPosition === 'right' ? icon: null}
    </div>
  );
}

export type HeaderType = 'title' | 'h1' | 'h2' | 'h3' | 'h4';

export function Header({
  type,
  text,
  classes = [],
}: {
  type: HeaderType;
  text: string;
  classes?: string[];
}) {
  const headerClass = `header--${type}`;
  const classNames = [...classes, headerClass];
  return (
    <Text classes={classNames} value={text}/>
  );
}

export function Text({
  value,
  classes = [],
}:{
  value: string;
  classes?: string[];
}) {
  const classNames = classes.length > 0 ? classes : ['text'];
  const className = classNames.join(" ");

  return (
    <span className={className}>{value}</span>
  );
}
