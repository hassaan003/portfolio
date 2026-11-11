'use client';

import { useEffect, useRef, useState } from 'react';

// Finds the closest parent that scrolls (in your layout this is <main>)
function getScrollParent(el: HTMLElement | null): HTMLElement | null {
  let node = el?.parentElement ?? null;
  while (node) {
    const { overflowY } = getComputedStyle(node);
    if (overflowY === 'auto' || overflowY === 'scroll') return node;
    node = node.parentElement;
  }
  return null;
}

export default function ScrollHint() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const scroller = getScrollParent(ref.current);
    if (!scroller) return;

    const update = () => {
      // Show only if there is more content below AND the user is still at the top
      const hasMore = scroller.scrollHeight - scroller.clientHeight > 40;
      const atTop = scroller.scrollTop < 40;
      setShow(hasMore && atTop);
    };

    update();
    scroller.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      scroller.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    // Zero-height wrapper that sticks to the bottom of the scroll area
    <div ref={ref} aria-hidden className="sticky bottom-0 z-10 h-0">
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-4 flex justify-center transition-opacity duration-500 ${
          show ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="scroll-hint-bounce text-brand">
          <svg viewBox="0 0 24 36" className="h-[1.8rem] w-[1.2rem]">
            <rect x="2" y="2" width="20" height="32" rx="10" fill="currentColor" />
            <rect x="11" y="8" width="2" height="7" rx="1" className="fill-background" />
          </svg>
        </div>
      </div>
    </div>
  );
}