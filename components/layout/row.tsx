import { FunctionComponent } from "preact";
import classNames from "classnames";

type Props = {
  className?: string;
  as?: keyof HTMLElementTagNameMap;
};

export const Row: FunctionComponent<Props> = function ({
  children,
  className,
  as = "div",
}) {
  const Component = as;

  return (
    <Component className={classNames(className, "grid grid-cols-12")}>
      {children}
    </Component>
  );
};
