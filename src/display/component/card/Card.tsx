import type {ReactNode} from "react";

export function Card({
  children,
  classes = [],
  onClick,
}:{
  children: ReactNode;
  classes?: string[];
  onClick: (args: any) => void;
}){
  const classNames = [...classes, "card"];
  const className = classNames.join(' ');

  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}
