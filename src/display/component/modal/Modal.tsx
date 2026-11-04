import {type ReactNode} from "react";
import type {CSS} from "../types.ts";
import {Icon} from "./Icon.tsx";

export function ModalContext({
  onClickBackground,
  children
}: {
  onClickBackground?: (args: any) => void;
  children: ReactNode;
}){
  return <div className="modal-background" onClick={onClickBackground}>{children}</div>;
}

export function Modal({
  children,
  classes = [],
  additionalStyle,
  onClose,
}:{
  children: ReactNode;
  classes?: string[];
  additionalStyle?: CSS;
  onClose: () => void;
}){
  const classNames = [...classes, 'modal'];
  const className = classNames.join(' ');

  return (
    <div className={className} style={additionalStyle}>
      <Icon iconId={'close'} onClick={onClose}/>
      {children}
    </div>
  );
}
