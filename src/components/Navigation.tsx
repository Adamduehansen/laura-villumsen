"use client";

import { MenuItem } from "@/services/MenuRepository";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Col from "./Col";
import Container from "./Container";
import Row from "./Row";

type Props = {
  menuItems: MenuItem[];
  email: string;
  phone: string;
};

export default function Navigation({
  menuItems,
  email,
  phone,
}: Props): React.JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.documentElement.classList.remove("overflow-hidden");
  }, [pathname]);

  function toggleMobileMenu() {
    setIsMobileMenuOpen((current) => !current);
    document.documentElement.classList.toggle("overflow-hidden");
  }

  const [worksMenuItem, aboutMenuItem] = menuItems;

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className="z-20 relative flex items-center gap-x-1 lg:hidden"
      >
        <svg
          width={14}
          height={14}
          className={classNames("rotate-0 duration-200", {
            "rotate-45 duration-200": isMobileMenuOpen,
          })}
        >
          <use href="/icons.svg#plus" />
        </svg>
        {isMobileMenuOpen ? "Close" : "Menu"}
      </button>
      <div
        className={classNames(
          "z-10 lg:z-20 fixed inset-0 bg-white duration-200 lg:transform-none lg:bg-transparent lg:bottom-0 lg:inset-y-auto lg:inset-x-0",
          {
            "translate-y-0": isMobileMenuOpen,
            "-translate-y-full": !isMobileMenuOpen,
          },
        )}
      >
        <div className="absolute bottom-0 lg:inset-x-0">
          <Container>
            <Row as="nav" className="mb-10 lg:mb-0">
              <Col className="relative text-7xl lg:text-8xl group" lg={3}>
                <Link
                  className={classNames("lg:hover:blur-sm font-semibold", {
                    "blur-sm": "/" === pathname,
                  })}
                  href={worksMenuItem.uri}
                >
                  {worksMenuItem.label}
                </Link>
                <svg
                  width={48}
                  height={48}
                  className="rotate-180 hidden group-hover:lg:block lg:absolute lg:top-7 lg:left-52"
                >
                  <use href="/icons.svg#arrow" />
                </svg>
              </Col>
              <Col className="relative text-7xl lg:text-8xl group" lg={3}>
                <Link
                  className={classNames("lg:hover:blur-sm font-semibold", {
                    "blur-sm": aboutMenuItem.uri.slice(0, -1) === pathname,
                  })}
                  href={aboutMenuItem.uri}
                >
                  {aboutMenuItem.label}
                </Link>
                <svg
                  width={48}
                  height={48}
                  className="rotate-180 hidden group-hover:lg:block lg:absolute lg:top-7 lg:left-60"
                >
                  <use href="/icons.svg#arrow" />
                </svg>
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
                    {email}
                  </a>
                </p>
              </Col>
              <Col lg={2} className="lg:pointer-events-auto">
                <p>
                  T: <a href={`tel:${phone.replaceAll(" ", "")}`}>{phone}</a>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
