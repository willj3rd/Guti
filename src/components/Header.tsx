"use client";

import { useEffect, useRef, useState } from "react";
import { Brand } from "./Brand";
import { Icon } from "./Icon";
import { company, navigation } from "@/data/company";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const background = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer"),
    );
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => {
      element.inert = true;
    });
    document.body.style.overflow = "hidden";
    mobileNav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const controls = [
          toggle.current,
          ...Array.from(
            mobileNav.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const media = window.matchMedia("(min-width: 1000px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", resize);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previous;
      background.forEach((element, i) => {
        element.inert = previousInert[i];
      });
      document.removeEventListener("keydown", handleKey);
      media.removeEventListener("change", resize);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled || open ? "header-solid" : ""}`}>
      <div className="container header-inner">
        <Brand compact />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="button button-green header-estimate" href="#contact">
          Get a free estimate <Icon name="arrow-up" />
        </a>
        <a
          className="mobile-phone"
          href={`tel:${company.contacts[0].telephone}`}
          aria-label="Call Darwin"
        >
          <Icon name="phone" />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          ref={mobileNav}
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {navigation.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => {
                setOpen(false);
                toggle.current?.focus();
              }}
            >
              <span>0{i + 1}</span>
              {item.label}
              <Icon name="arrow-up" />
            </a>
          ))}
          <a
            href="#contact"
            className="button button-green"
            onClick={() => setOpen(false)}
          >
            Get a free estimate <Icon name="arrow" />
          </a>
        </nav>
      )}
    </header>
  );
}
