"use client"

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { cn } from '@/lib/utils';
import { safetyInformationData } from '@/content/safety-information';

const AngleIcon = ({ className }: { className?: string }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="388" height="228" viewBox="0 0 388 228" fill="none">
      <path d="M193.8 0L210.8 17L370.8 177L387.8 194L353.9 227.9L336.9 210.9L193.9 67.9L50.9 210.9L33.9 227.9L0 194L17 177L177 17L194 0H193.8Z" fill="currentColor" />
    </svg>
  );
};

const CloseWidget = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="bg-navy text-white p-2 rounded-full absolute top-0 right-0" onClick={onClick}>
      <AngleIcon className="size-4" />
      <span className="sr-only">Close widget</span>
    </button>
  );
};

export default function SafetyInformation() {
  return (
    <div className="relative z-90">
      <Disclosure>
        {({ open, close }) => (
          <>
            {!open && (
              <DisclosureButton
                className={cn(
                  "bg-navy text-white font-bold py-2 w-full uppercase text-lg font-open-sans",
                  "flex items-center justify-center gap-6"
                )}
              >
                {safetyInformationData.title}
                <span className="border borer-white rounded-full p-1">
                  <AngleIcon className="size-2" />
                </span>
              </DisclosureButton>
            )}

            <div className="overflow-hidden">
              <DisclosurePanel
                transition
                className="origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
              >
                <div className="page-width relative py-6">

                  <CloseWidget onClick={close} />
                  {safetyInformationData.content}
                </div>
              </DisclosurePanel>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
}