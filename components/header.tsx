import { JSX } from "preact/jsx-runtime";
import { Contact } from "./contact.tsx";
import { Navigation } from "./navigation.tsx";
import { Container } from "./container.tsx";

export function Header(): JSX.Element {
  return (
    <Container as="header" className="flex justify-between mb-7 mt-2.5">
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
    </Container>
  );
}
