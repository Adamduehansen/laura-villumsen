import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import classNames from "classnames";
import { Col } from "$component/layout/col.tsx";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";

// FIXME: we do not care about scroll lock. Go back to previous implementation.
function toggleScroll(): void {
  document.documentElement.classList.toggle("overflow-hidden");
}

export function Navigation(): JSX.Element {
  const showMenu = useSignal(false);

  function toggleMenu(): void {
    showMenu.value = !showMenu.value;
    toggleScroll();
  }

  // TODO: set styles for current list item.
  // https://fresh.deno.dev/docs/examples/active-links
  return (
    <>
      <button
        onClick={toggleMenu}
        className="z-20 relative flex items-center gap-x-1 lg:hidden"
      >
        {showMenu.value ? "Close" : "Menu"}
      </button>
      <div
        className={classNames(
          "z-10 lg:z-20 fixed inset-0 bg-white duration-200 lg:transform-none lg:bg-transparent lg:bottom-0 lg:inset-y-auto lg:inset-x-0",
          {
            "translate-y-0": showMenu.value,
            "-translate-y-full": !showMenu.value,
          },
        )}
      >
        <div className="absolute bottom-0 lg:inset-x-0">
          <Container>
            <Row as="nav" className="mb-10 lg:mb-0">
              <Col className="relative text-4xl lg:text-5xl group" lg={3}>
                <a
                  className="lg:hover:blur-sm font-semibold aria-[current]:blur-sm"
                  href="/"
                >
                  Works
                </a>
              </Col>
              <Col className="relative text-4xl lg:text-5xl group" lg={3}>
                <a
                  className="lg:hover:blur-sm font-semibold aria-[current]:blur-sm"
                  href="/about"
                >
                  About
                </a>
              </Col>
            </Row>
            <Row className="lg:fixed lg:w-full lg:left-0 lg:top-[10px] lg:leading-4 lg:pointer-events-none">
              <Col className="hidden lg:block" lg={4}></Col>
              <Col lg={2}>Open for new biz!</Col>
              <Col lg={2} className="lg:pointer-events-auto">
                <p>
                  M:{" "}
                  <a
                    className="text-link"
                    href="mailto:design@lauravillumsen.dk"
                  >
                    design@lauravillumsen.dk
                  </a>
                </p>
              </Col>
              <Col lg={2} className="lg:pointer-events-auto">
                <p>
                  T: <a href={`tel:30118674`}>+45 30 11 86 74</a>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
