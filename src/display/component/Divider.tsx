export function Divider({
  classes = []
}: {
  classes?: string[];
}) {
  const classNames = [...classes, 'divider'];
  const className = classNames.join(' ');

  return <div className={className}></div>;
}
