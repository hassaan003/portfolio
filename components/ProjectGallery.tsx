'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  title: string;
  type: 'web' | 'mobile';
  isRtl: boolean;
}

const arrowClass =
  'absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 place-items-center bg-background/85 text-foreground hover:text-brand transition-colors sm:grid';

export default function ProjectGallery({ images, title, type, isRtl }: ProjectGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const last = images.length - 1;

  // Scroll to a slide (in right-to-left pages the scroll goes negative)
  const goTo = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el) return;
      el.scrollTo({ left: (isRtl ? -1 : 1) * i * el.clientWidth, behavior: 'smooth' });
    },
    [isRtl]
  );

  // Update the dots while the user swipes
  const onScroll = () => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    setIndex(Math.round(Math.abs(el.scrollLeft) / el.clientWidth));
  };

  // Keyboard: left / right arrow keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const el = trackRef.current;
      if (!el || el.clientWidth === 0) return;

      const forward = (e.key === 'ArrowRight') !== isRtl;
      const current = Math.round(Math.abs(el.scrollLeft) / el.clientWidth);
      const next = forward ? current + 1 : current - 1;
      if (next >= 0 && next <= last) goTo(next);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo, isRtl, last]);

  const many = images.length > 1;

  return (
    <div>
      <div className="relative">
        {/* Slides */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        >
          {images.map((src, i) => (
            <div key={src} className="w-full shrink-0 snap-start snap-always">
              {type === 'mobile' ? (
                // Phone screenshots: fixed box, whole picture visible
                <div className="relative h-[24rem] bg-brand/5">
                  <Image
                    src={src}
                    alt={`${title} - ${i + 1}`}
                    fill
                    sizes="(min-width: 768px) 700px, 100vw"
                    className="object-contain py-2"
                  />
                </div>
              ) : (
                // Website screenshots: tall pictures scroll up and down inside
                <div className="h-[19.4rem] overflow-y-auto">
                  <Image
                    src={src}
                    alt={`${title} - ${i + 1}`}
                    width={1200}
                    height={800}
                    sizes="(min-width: 768px) 700px, 100vw"
                    style={{ width: '100%', height: 'auto' }}
                    className="block"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Arrow buttons (computer screens) */}
        {many && index > 0 && (
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous image"
            className={`${arrowClass} start-2`}
          >
            <ChevronLeft className="size-5 rtl:rotate-180" />
          </button>
        )}
        {many && index < last && (
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next image"
            className={`${arrowClass} end-2`}
          >
            <ChevronRight className="size-5 rtl:rotate-180" />
          </button>
        )}
      </div>

      {/* Dots */}
      {many && (
        <div className="mt-2 flex justify-center">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Image ${i + 1}`}
              aria-current={i === index}
              className="grid size-5 place-items-center"
            >
              <span
                className={`size-2 rounded-full transition-colors ${
                  i === index ? 'bg-brand' : 'bg-muted/40'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}