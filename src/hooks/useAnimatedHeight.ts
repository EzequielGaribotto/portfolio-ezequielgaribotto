import { useLayoutEffect, useRef, type RefObject } from "react";

/**
 * Glides an element's height to its new size whenever `key` changes (tags opening or closing),
 * instead of snapping. Everything below it moves with it frame by frame, and so does a masonry
 * grid that re-measures its cards, so the neighbouring cards shift smoothly too.
 * Visitors who asked for reduced motion get the instant change.
 */
export function useAnimatedHeight(ref: RefObject<HTMLElement | null>, key: unknown) {
  const last = useRef<number | null>(null);

  // Keep the last known height current (window resizes, images loading, a running glide)
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      last.current = el.getBoundingClientRect().height;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from = last.current;
    const to = el.getBoundingClientRect().height;
    last.current = to;
    if (from === null || Math.abs(from - to) < 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.style.overflow = "hidden";
    const glide = el.animate([{ height: `${from}px` }, { height: `${to}px` }], {
      duration: 380,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    });
    const done = () => {
      el.style.overflow = "";
    };
    glide.addEventListener("finish", done);
    glide.addEventListener("cancel", done);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
