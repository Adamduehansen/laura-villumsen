import { JSX } from "preact/jsx-runtime";
import { Col } from "$component/layout/col.tsx";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Image } from "$component/image.tsx";
import { Video } from "$component/video.tsx";

type Props =
  | {
    variant: "image";
    url: string;
    width: number;
    height: number;
    alt: string | null;
  }
  | {
    variant: "video";
    src: string;
  };

export function CaseHero(props: Props): JSX.Element {
  return (
    <Container fluid className="mb-8.5">
      <Row>
        <Col>
          {props.variant === "image" && (
            // TODO: adds sizes and srcset
            <Image
              src={props.url}
              width={props.width}
              height={props.height}
              alt={props.alt ?? ""}
              class="w-full"
            />
          )}
          {props.variant === "video" && <Video src={props.src} />}
        </Col>
      </Row>
    </Container>
  );
}
