import { FunctionComponent } from "preact";
import classNames from "classnames";

interface Props {
  fluid?: boolean;
  as?: keyof HTMLElementTagNameMap;
  className?: string;
}

export const Container: FunctionComponent<Props> = function ({
  children,
  className = undefined,
  as = "div",
  fluid = false,
}) {
  const Component = as;

  // The "classnames" library will render an empty "class" prop if either
  // "className" is undefined or "fluid" is false. To prevent that, check if
  // neither of these two are true.
  const hasCssClasses = className !== undefined || fluid === false;

  return (
    <Component
      class={hasCssClasses
        ? classNames(className, {
          "mx-2.5": fluid === false,
        })
        : undefined}
    >
      {children}
    </Component>
  );
};
