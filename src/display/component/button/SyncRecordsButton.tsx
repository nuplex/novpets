import {Button} from "../Button.tsx";
import {getCopy} from "../../../service/CopyService.ts";

export function SyncRecordsButton({
  onSync,
  classes = [],
}: {
  onSync: (args: any) => void;
  classes?: string[];
}) {
  return (
    <Button
      classes={classes}
      text={getCopy('syncButton')}
      type={'sync'}
      onClick={onSync}
    />
  );
}
