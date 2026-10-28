import { useEffect, type RefObject } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Focus management for a modal dialog (give the dialog element tabIndex={-1}).
 * While `active`: focus moves into the dialog, Tab wraps inside it, focus that lands outside
 * (the page behind, or a PDF viewer that swallows keys) is pulled back, and on close focus goes
 * back to the element that opened it. `returnTo` covers openers that unmount on click (menu items).
 */
export function useDialogFocus(
  active: boolean,
  dialogRef: RefObject<HTMLElement | null>,
  returnTo?: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!active || !dialog) return;

    const opener = document.activeElement as HTMLElement | null;
    const fallback = returnTo?.current;
    dialog.focus();

    const onFocusIn = (e: FocusEvent) => {
      if (!dialog.contains(e.target as Node)) dialog.focus();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      if (e.shiftKey && (current === first || current === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("keydown", onKeyDown);
      const target = opener?.isConnected && opener !== document.body ? opener : fallback;
      target?.focus();
    };
  }, [active, dialogRef, returnTo]);
}
