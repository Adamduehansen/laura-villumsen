export default function Row({
  children,
}: React.PropsWithChildren): JSX.Element {
  return <div className='grid grid-cols-12'>{children}</div>;
}
