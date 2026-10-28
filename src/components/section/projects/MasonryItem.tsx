"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "./ProjectsSection.module.css";

// The grid has tiny rows; an item spans as many as its content needs, so columns pack
// with each card at its own height while the order stays left to right, top to bottom.
const ROW_UNIT = 4; // px, must match grid-auto-rows in ProjectsSection.module.css
const GAP = 32; // px, the space kept below every card (2rem)

export default function MasonryItem({ id, children }: { id: string; children: React.ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);
  const [span, setSpan] = useState(1);

  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    const measure = () => setSpan(Math.max(1, Math.ceil((el.getBoundingClientRect().height + GAP) / ROW_UNIT)));
    measure();
    // Cards grow and shrink (images load, tags open), so the span follows the content
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.masonryItem} data-card-id={id} style={{ gridRowEnd: `span ${span}` }}>
      <div ref={inner}>{children}</div>
    </div>
  );
}
