import classNames from 'classnames';

type Props = React.PropsWithChildren<{
  as?: keyof HTMLElementTagNameMap;
  className?: string;
}>;

export default function Container({
  children,
  as = 'div',
  className,
}: Props): JSX.Element {
  const Component = as;
  return (
    <Component className={classNames('mx-grid', className)}>
      {children}
    </Component>
  );
}
