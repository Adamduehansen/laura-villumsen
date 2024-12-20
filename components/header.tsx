import { JSX } from "preact/jsx-runtime";
import { Contact } from "$component/contact.tsx";
import { Navigation } from "$component/navigation.tsx";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Col } from "$component/layout/col.tsx";

export function Header(): JSX.Element {
  return (
    <Container as="header" className="mb-7 mt-2.5">
      <Row>
        <Col className="flex justify-between">
          <div>
            <a href="/">
              <h1>Laura Villumsen</h1>
            </a>
            <span>/Portfolio</span>
          </div>
          <div>
            <input type="checkbox" id="menuToggleInput" class="peer hidden" />
            <button>
              <label for="menuToggleInput" class="cursor-pointer">
                Menu
              </label>
            </button>
            <div class="hidden peer-checked:block">
              <Navigation />
              <Contact />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
