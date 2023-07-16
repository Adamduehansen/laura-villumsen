import classNames from 'classnames';

type Props = React.PropsWithChildren<{
  as?: keyof HTMLElementTagNameMap;
  fluid?: boolean;
  className?: string;
}>;

export default function Container({
  children,
  as = 'div',
  fluid = false,
  className,
}: Props): JSX.Element {
  const Component = as;
  return (
    <Component
      className={classNames(className, {
        'mx-grid': !fluid,
      })}
    >
      {children}
    </Component>
  );
}
