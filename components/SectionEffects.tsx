"use client";

import { useEffect } from "react";

const surfaceSelector = [
  ".about-card",
  ".about-note",
  ".timeline-content",
  ".project-card",
  ".skills-panel",
  ".education-main",
  ".education-side",
  ".contact-form",
  ".contact-links > a",
].join(",");

export default function SectionEffects() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main > section");
    sections.forEach((section) => section.classList.add("depth-section"));

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion || coarsePointer) {
      return () => sections.forEach((section) => section.classList.remove("depth-section"));
    }

    let activeSurface: HTMLElement | null = null;
    const resetSurface = (surface: HTMLElement | null) => {
      if (!surface) return;
      surface.style.removeProperty("transform");
      surface.style.removeProperty("--glow-x");
      surface.style.removeProperty("--glow-y");
      surface.classList.remove("is-tilting");
    };

    const onPointerMove = (event: PointerEvent) => {
      const surface = event.target instanceof Element ? event.target.closest<HTMLElement>(surfaceSelector) : null;
      if (surface !== activeSurface) {
        resetSurface(activeSurface);
        activeSurface = surface;
      }
      if (!surface) return;

      const bounds = surface.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      const rotateX = (0.5 - y) * 7;
      const rotateY = (x - 0.5) * 8;
      surface.style.setProperty("--glow-x", `${x * 100}%`);
      surface.style.setProperty("--glow-y", `${y * 100}%`);
      surface.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0,-5px,18px)`;
      surface.classList.add("is-tilting");
    };

    const onPointerLeave = () => {
      resetSurface(activeSurface);
      activeSurface = null;
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    return () => {
      resetSurface(activeSurface);
      sections.forEach((section) => section.classList.remove("depth-section"));
      document.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return null;
}
