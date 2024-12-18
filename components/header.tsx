import { JSX } from "preact/jsx-runtime";
import { Contact } from "./contact.tsx";
import { Navigation } from "./navigation.tsx";

export function Header(): JSX.Element {
  return (
    <header class="flex justify-between">
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
    </header>
  );
}
