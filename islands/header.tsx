import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import { Contact } from "$component/contact.tsx";
import { Navigation } from "$component/navigation.tsx";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Col } from "$component/layout/col.tsx";
import classNames from "classnames";

function toggleScroll(): void {
  document.documentElement.classList.toggle("overflow-hidden");
}

export function Header(): JSX.Element {
  const showMenu = useSignal(false);

  function toggleMenu(): void {
    showMenu.value = !showMenu.value;
    toggleScroll();
  }

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
          </div>
          {/* TODO: Rework this in the future to also work in the emulator! */}
          <div
            class={classNames(
              "fixed inset-0 bg-white z-10 flex flex-col duration-200 justify-between px-2.5",
              {
                "-translate-y-full": showMenu.value === false,
                "translate-y-0": showMenu.value === true,
              },
            )}
          >
            <Navigation />
            <Contact />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
