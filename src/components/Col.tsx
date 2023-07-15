type ColRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Props = React.PropsWithChildren<{
  sm?: ColRange;
}>;

export default function Col({ children, sm = 12 }: Props): JSX.Element {
  return <div className={`col-span-${sm}`}>{children}</div>;
}
