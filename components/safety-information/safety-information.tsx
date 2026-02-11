"use client"

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { safetyInformationData } from '@/content/safety-information';
import Link from 'next/link';

const AngleIcon = ({ className }: { className?: string }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="388" height="228" viewBox="0 0 388 228" fill="none">
      <path d="M193.8 0L210.8 17L370.8 177L387.8 194L353.9 227.9L336.9 210.9L193.9 67.9L50.9 210.9L33.9 227.9L0 194L17 177L177 17L194 0H193.8Z" fill="currentColor" />
    </svg>
  );
};

export default function SafetyInformation() {
  const [isVisible, setIsVisible] = useState(true);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the top of the content enters the viewport, fade out the header
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px'
      }
    );

    observer.observe(contentElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Link
        href="#important-safety-information-content"
        id="important-safety-information"
        className={cn(
          "sticky bottom-0 z-50",
          "bg-navy hover:bg-navy-dark transition-all text-white font-bold py-2 w-full uppercase text-base md:text-lg font-open-sans",
          "flex items-center justify-center gap-4 md:gap-6",
          "transition-opacity duration-500",
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
        {safetyInformationData.title}
        <span className="border borer-white rounded-full p-1">
          <AngleIcon className="size-2" />
        </span>
      </Link>

      <section ref={contentRef} className="page-width py-6 relative" id="important-safety-information-content">
        <Link href="#top" className="bg-navy text-white p-2 rounded-full absolute top-0 right-2">
          <AngleIcon className="size-4" />
          <span className="sr-only">Back to Top</span>
        </Link>
        {safetyInformationData.content}
      </section>
    </>
  );
}