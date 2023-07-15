type Props = React.PropsWithChildren<{
  as?: keyof HTMLElementTagNameMap;
}>;

export default function Container({
  children,
  as = 'div',
}: Props): JSX.Element {
  const Component = as;
  return <Component className='mx-grid'>{children}</Component>;
}
