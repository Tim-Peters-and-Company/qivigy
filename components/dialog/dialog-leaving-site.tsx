"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RightAngleIcon } from "@/components/icons/rightAngle";

function getDisplayUrl(href: string): string {
  try {
    const url = new URL(href, typeof window !== "undefined" ? window.location.origin : "https://qivigy.com");
    return url.hostname.replace(/^www\./, "") + (url.pathname === "/" ? "" : url.pathname);
  } catch {
    return href;
  }
}

function isExternalLink(href: string): boolean {
  if (!href || href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }
  try {
    const url = new URL(href, typeof window !== "undefined" ? window.location.origin : "https://qivigy.com");
    return typeof window !== "undefined" && url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function findAnchor(el: EventTarget | null): HTMLAnchorElement | null {
  let node = el as Node | null;
  while (node) {
    if (node.nodeName === "A") return node as HTMLAnchorElement;
    node = node.parentNode;
  }
  return null;
}

export function DialogLeavingSite() {
  const [open, setOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  const handleClick = useCallback((e: MouseEvent) => {
    const anchor = findAnchor(e.target);
    if (!anchor || !anchor.href) return;
    const href = anchor.getAttribute("href");
    if (!href || !isExternalLink(href)) return;
    e.preventDefault();
    e.stopPropagation();
    setPendingUrl(anchor.href);
    setOpen(true);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [handleClick]);

  const handleCancel = useCallback(() => {
    setOpen(false);
    setPendingUrl(null);
  }, []);

  const handleYes = useCallback(() => {
    if (pendingUrl) {
      window.open(pendingUrl, "_blank", "noopener,noreferrer");
    }
    setOpen(false);
    setPendingUrl(null);
  }, [pendingUrl]);

  const displayUrl = pendingUrl ? getDisplayUrl(pendingUrl) : "";

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) handleCancel(); }}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            You are now leaving QIVIGY.com/hcp
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-lg">
            Would you like to proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col md:flex-row">
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel <RightAngleIcon className="size-5" />
          </Button>
          <Button type="button" variant="default" onClick={handleYes}>
            Yes <RightAngleIcon className="size-5" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
