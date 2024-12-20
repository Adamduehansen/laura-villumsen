import { FunctionComponent } from "preact";
import classNames from "classnames";

interface Props {
  fluid?: boolean;
  as?: keyof HTMLElementTagNameMap;
  className?: string;
}

export const Container: FunctionComponent<Props> = function ({
  children,
  className,
  as = "div",
  fluid = false,
}) {
  const Component = as;
  return (
    <Component
      class={classNames(className, {
        "mx-2.5": fluid === false,
      })}
    >
      {children}
    </Component>
  );
};
