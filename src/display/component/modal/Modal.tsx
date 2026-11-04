import {type ReactNode} from "react";
import {Icon} from "../Icon.tsx";

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
  onClose,
}:{
  children: ReactNode;
  classes?: string[];
  onClose: () => void;
}){
  const classNames = [...classes, 'modal'];
  const className = classNames.join(' ');

  return (
    <div className={className}>
      <Icon
        classes={['modal--close', 'filter--gray']}
        iconId={'close'}
        onClick={onClose}
      />
      {children}
    </div>
  );
}
