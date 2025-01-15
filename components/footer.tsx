import { JSX } from "preact/jsx-runtime";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Col } from "$component/layout/col.tsx";

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-[#D9D9D9] py-3">
      <Container>
        <Row className="pt-64 pb-4 lg:pt-0 lg:pb-64">
          <Col lg={3} className="pb-4">
            <p>
              If you need further details, have inquiries about my work, or
              require assistance with graphic design, feel free to reach out to
              me.
            </p>
          </Col>
          <Col sm={4} lg={1} lgStart={10}>
            <a
              href="https://www.instagram.com/lauravill_design/?hl=da"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </Col>
          <Col sm={4} lg={1}>
            <a
              href="https://www.linkedin.com/in/laura-villumsen-design"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </Col>
          <Col sm={4} lg={1}>
            <a
              href="#top"
              className="flex items-center gap-x-2 justify-end lg:justify-normal"
            >
              To the top
            </a>
          </Col>
        </Row>
        <Row className="pb-4">
          <Col sm={4} lg={1} lgStart={10} className="text-sm">
            <p>©2025</p>
          </Col>
          <Col sm={8} lg={2} className="text-sm">
            <p>Design by Laura Villumsen</p>
            <p>
              Coded by{" "}
              <a
                href="https://adamduehansen.deno.dev"
                target="_BLANK"
                rel="noreferrer"
                class="text-link z-50 relative"
              >
                Adam Due Hansen
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
