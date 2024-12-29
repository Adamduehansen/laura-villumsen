import { FunctionComponent } from "preact";

interface Props {
  heading: string;
}

export const CaseContentWrapper: FunctionComponent<Props> = function (
  props,
) {
  return (
    <div>
      <p class="font-semibold">{props.heading}</p>
      {props.children}
    </div>
  );
};
