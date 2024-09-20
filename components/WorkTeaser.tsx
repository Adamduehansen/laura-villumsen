import { JSX } from "preact";
import { WorkTeaser } from "../domain/WorkTeaser.ts";

type Props = {
  [key in keyof WorkTeaser]: WorkTeaser[key];
};

export default function WorkTeaserBox(props: Props): JSX.Element {
  return (
    <li class="workTeaser">
      <a href={props.path}>
        <figure>
          <img src={props.imageUrl} alt="" />
          <figcaption class="workTeaser__caption">
            <span>{props.client}</span>
            <span>{props.types}</span>
          </figcaption>
        </figure>
      </a>
    </li>
  );
}
