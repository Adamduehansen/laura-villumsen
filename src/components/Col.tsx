import classNames from 'classnames';

type ColRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Props = React.PropsWithChildren<{
  sm?: ColRange;
  md?: ColRange;
  mdStart?: ColRange;
  className?: string;
}>;

export default function Col({
  children,
  sm = 12,
  md,
  mdStart,
  className,
}: Props): JSX.Element {
  return (
    <div
      className={classNames(`col-span-${sm}`, className, {
        [`md:col-span-${md}`]: md,
        [`md:col-start-${mdStart}`]: mdStart,
      })}
    >
      {children}
    </div>
  );
}
