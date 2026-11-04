import type {ReactNode} from "react";

/**
 * Simple wrapper for form elements.
 */
export function Form({
  classes = [],
  children,
}: {
  classes?: string[];
  children: ReactNode;
}) {
  const classNames = [...classes, 'form'];
  const className = classNames.join(' ');
  return (
    <div className={className}>
      {children}
    </div>
  );
}
