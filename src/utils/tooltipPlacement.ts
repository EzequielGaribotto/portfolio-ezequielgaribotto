/**
 * Keeps a tooltip inside the viewport. It sets --shift (px) on the element, which the CSS adds to
 * its horizontal centring, and (optionally) flips it below its anchor when there is no room above.
 */
export function placeTooltip(el: HTMLElement | null, opts?: { flipBelowTop?: number }) {
  if (!el) return;
  el.style.setProperty("--shift", "0px");
  delete el.dataset.below;
  const margin = 8;
  const rect = el.getBoundingClientRect();
  let shift = 0;
  if (rect.left < margin) shift = margin - rect.left;
  else if (rect.right > window.innerWidth - margin) shift = window.innerWidth - margin - rect.right;
  if (shift !== 0) el.style.setProperty("--shift", `${Math.round(shift)}px`);
  if (opts?.flipBelowTop !== undefined && rect.top < opts.flipBelowTop) el.dataset.below = "1";
}
