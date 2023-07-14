export default function Container({
  children,
}: React.PropsWithChildren): JSX.Element {
  return <div className='mx-grid'>{children}</div>;
}
