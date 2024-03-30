import classNames from 'classnames';

type Props = {
  className?: string;
  as?: keyof HTMLElementTagNameMap;
};

export default function Row({
  children,
  className,
  as = 'div',
}: React.PropsWithChildren<Props>): JSX.Element {
  const As = as;

  return (
    <As className={classNames('grid grid-cols-12', className)}>{children}</As>
  );
}
