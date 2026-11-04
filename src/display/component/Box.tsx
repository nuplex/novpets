import type {ReactNode} from "react";

/**
 * A simple box around an element.
 * @param classes
 * @param children
 * @param onClick
 * @constructor
 */
export function Box({
  classes = [],
  children,
  onClick,
}:{
  classes?: string[];
  children: ReactNode;
  onClick?: (args: any) => void;
}) {
  const classNames = [...classes, 'box'];
  const className = classNames.join(' ');
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}
