type Props = React.PropsWithChildren<{
  sm: number;
}>;

export default function Col({ children, sm }: Props): JSX.Element {
  return <div className={`col-span-${sm}`}>{children}</div>;
}
