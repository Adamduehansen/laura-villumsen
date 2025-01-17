import { JSX } from "preact/jsx-runtime";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Col } from "$component/layout/col.tsx";

export default function Footer(): JSX.Element {
  // TODO: style for mibile
  return (
    <footer>
      <Container className="mb-3">
        <Row>
          <Col sm={4} lg={1} lgStart={10}>
            <a
              href="https://www.instagram.com/lauravill_design/?hl=da"
              target="_blank"
              rel="noreferrer"
              class="text-link z-50 relative"
            >
              Instagram
            </a>
          </Col>
          <Col sm={6} lg={1} lgStart={11}>
            <a
              href="https://www.linkedin.com/in/laura-villumsen-design"
              target="_blank"
              rel="noreferrer"
              class="text-link z-50 relative"
            >
              LinkedIn
            </a>
          </Col>
          <Col sm={2} lg={1} lgStart={12}>
            <p>©2025</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
