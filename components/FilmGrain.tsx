"use client";

/**
 * Film grain overlay.
 * Uses an inline SVG feTurbulence filter as background-image (no external PNG needed).
 * Animation is a simple background-position shift — fully GPU composited.
 * Automatically static when prefers-reduced-motion is set.
 */
export function FilmGrain() {
  return (
    <div
      className="film-grain select-none"
      aria-hidden="true"
    />
  );
}
