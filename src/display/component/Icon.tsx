import add from '../../assets/add.svg';
import bird from '../../assets/bird.svg';
import close from '../../assets/close.svg';
import database from '../../assets/database.svg';
import deleteIcon from '../../assets/delete.svg';
import edit from '../../assets/edit.svg';
import logo from '../../assets/logo.svg';
import paw from '../../assets/paw.svg';
import record from '../../assets/record.svg';

export type IconId =
  | 'add'
  | 'bird'
  | 'close'
  | 'database'
  | 'delete'
  | 'edit'
  | 'logo'
  | 'paw'
  | 'record';

function getIcon(iconId: IconId) {
  switch (iconId) {
    case 'add':
      return add;
    case 'bird':
      return bird;
    case 'close':
      return close;
    case 'delete':
      return deleteIcon;
    case 'edit':
      return edit;
    case 'database':
      return database;
    case 'logo':
      return logo;
    case 'record':
      return record;
    case 'paw':
    default:
      return paw;
  }
}

export function Icon({
  iconId,
  classes = [],
  onClick,
}:{
  iconId: IconId;
  classes?: string[];
  onClick?: (args: any) => void;
}) {
  const classNames = ['icon', ...classes];

  if (onClick) {
    classNames.push('icon--clickable');
  }

  const className = classNames.join(" ");

  return (
    <img
      className={className}
      src={getIcon(iconId)}
      onClick={onClick}
      alt={iconId}
    />
  );
}
