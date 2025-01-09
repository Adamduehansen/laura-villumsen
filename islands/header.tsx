import { JSX } from "preact/jsx-runtime";
import { Navigation } from "$component/navigation.tsx";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Col } from "$component/layout/col.tsx";

export function Header(): JSX.Element {
  // TODO: needs desktop styling.

  return (
    <header className="z-10">
      <Container>
        <Row>
          <Col>
            <div className="flex justify-between pb-12 pt-4 lg:py-0 z-20 items-start">
              <div className="z-20 lg:flex lg:justify-between lg:fixed lg:left-[10px] lg:right-[10px] lg:top-[10px] lg:leading-4">
                <a href="/" className="block z-20">
                  Laura Villumsen
                </a>
                <p className="z-20">
                  <span className="inline lg:hidden">/</span>Portfolio
                </p>
              </div>
              <Navigation />
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
