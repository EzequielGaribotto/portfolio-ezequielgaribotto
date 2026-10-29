/**
 * Keeps a tooltip inside the viewport. It sets --shift (px) on the element, which the CSS adds to
 * its horizontal centring. When there is no room above its anchor (top edge under `flipBelowTop`) it
 * opens below it (data-below), or, with `sideWhenCrowded` (the anchor is a column of tags with plain
 * text to its left), beside it (data-side="left", vertically clamped to the viewport via --top) so
 * the tags under the anchor stay visible.
 */
export function placeTooltip(
  el: HTMLElement | null,
  opts?: { flipBelowTop?: number; sideWhenCrowded?: boolean },
) {
  if (!el) return;
  el.style.setProperty("--shift", "0px");
  el.style.removeProperty("--top");
  delete el.dataset.below;
  delete el.dataset.side;
  const margin = 8;
  const rect = el.getBoundingClientRect();
  const fitsAbove = opts?.flipBelowTop === undefined || rect.top >= opts.flipBelowTop;

  if (!fitsAbove) {
    const anchor = el.parentElement?.getBoundingClientRect();
    const minTop = opts!.flipBelowTop!;
    // Room to the left of the anchor for the whole tip, plus the 0.5rem gap the CSS leaves
    if (opts?.sideWhenCrowded && anchor && anchor.left - margin >= rect.width + 8) {
      const top = Math.min(
        Math.max(anchor.top + anchor.height / 2 - rect.height / 2, minTop),
        Math.max(minTop, window.innerHeight - margin - rect.height),
      );
      el.dataset.side = "left";
      el.style.setProperty("--top", `${Math.round(top - anchor.top)}px`);
      return;
    }
    el.dataset.below = "1";
  }

  let shift = 0;
  if (rect.left < margin) shift = margin - rect.left;
  else if (rect.right > window.innerWidth - margin) shift = window.innerWidth - margin - rect.right;
  if (shift !== 0) el.style.setProperty("--shift", `${Math.round(shift)}px`);
}
