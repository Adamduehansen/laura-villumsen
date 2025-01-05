import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import { Contact } from "$component/contact.tsx";
import { Navigation } from "$component/navigation.tsx";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Col } from "$component/layout/col.tsx";
import classNames from "classnames";

function toggleScroll(): void {
  document.body.classList.toggle("overflow-hidden");
}

export function Header(): JSX.Element {
  const showMenu = useSignal(false);

  function toggleMenu(): void {
    console.log("Clicked");

    showMenu.value = !showMenu.value;
    toggleScroll();
  }

  const menuClasses = classNames(
    "fixed inset-0 bg-white z-10 flex-col",
    {
      "hidden": showMenu.value === false,
      "flex": showMenu.value === true,
    },
  );

  return (
    <Container as="header" className="mb-7 mt-2.5">
      <Row>
        <Col className="flex justify-between">
          <div class="z-20">
            <a href="/">
              <h1>Laura Villumsen</h1>
            </a>
            <span>/Portfolio</span>
          </div>
          <div>
            <button
              class="relative z-20"
              onClick={toggleMenu}
            >
              Menu
            </button>
            <div class={menuClasses}>
              <Navigation />
              <Contact />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
