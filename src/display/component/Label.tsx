import type {ReactNode} from "react";

export type LabelPosition = 'left' | 'top';

export function Label({
  text,
  position,
  children,
  classes = [],
  textClasses = [],
}:{
  text: string;
  position: LabelPosition;
  children: ReactNode;
  classes?: string[];
  textClasses?: string[];
}){
  const classNames = [...classes, 'label'];
  const className = classNames.join(' ');

  const textClassNames = [...textClasses, `label--${position}`];
  const textClassName = textClassNames.join(' ');

  return (
    <div className={className}>
      <span className={textClassName}>{text}</span>
      {children}
    </div>
  );
}
