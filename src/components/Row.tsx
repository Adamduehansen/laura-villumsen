import classNames from 'classnames';

type Props = {
  className?: string;
};

export default function Row({
  children,
  className,
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <div className={classNames('grid grid-cols-12', className)}>{children}</div>
  );
}
