import {Text, TextWithIcon} from "./Text.tsx";
import {Icon} from "./Icon.tsx";

export function AddCard({
  header,
  subheader,
  onClick,
}:{
  header: string;
  subheader?: string;
  onClick: (args: any) => void;
}) {
  return (
    <div className={"add-card card"} onClick={onClick}>
      <TextWithIcon
        icon={<Icon classes={['filter--primary']} iconId={'add'}/>}
        iconPosition={'left'}
        textClasses={['add-card--text']}
        text={header}
      />
      {subheader ?
        <Text classes={['add-card--subheader']} value={subheader}/>
        : null}
    </div>
  );
}
