import { JSX } from "preact/jsx-runtime";
import { Col } from "$component/layout/col.tsx";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Image } from "$component/image.tsx";

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
            <Image
              src={props.url}
              width={props.width}
              height={props.height}
              alt={props.alt ?? ""}
            />
          )}
          {props.variant === "video" && (
            <video autoplay loop muted src={props.src} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
