import { FunctionComponent } from "preact";
import classNames from "classnames";

export type ColRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface Props {
  sm?: ColRange;
  md?: ColRange;
  lg?: ColRange;
  mdStart?: ColRange;
  lgStart?: ColRange;
  lgOrder?: number;
  className?: string;
}

export const Col: FunctionComponent<Props> = function ({
  children,
  sm = 12,
  md,
  mdStart,
  lg,
  lgStart,
  lgOrder,
  className,
}) {
  return (
    <div
      className={classNames(`col-span-${sm}`, className, {
        [`md:col-span-${md}`]: md,
        [`md:col-start-${mdStart}`]: mdStart,
        [`lg:col-span-${lg}`]: lg,
        [`lg:col-start-${lgStart}`]: lgStart,
        [`lg:order-${lgOrder}`]: lgOrder,
      })}
    >
      {children}
    </div>
  );
};
