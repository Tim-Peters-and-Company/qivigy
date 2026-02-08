"use client";

import { useEffect, useState } from "react";
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

const STORAGE_KEY = "qivigy-us-only-acknowledged";

export const DialogUSOnly = () => {
  const [mainOpen, setMainOpen] = useState(false);
  const [leavingOpen, setLeavingOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const check = () => {
      try {
        const acknowledged = localStorage.getItem(STORAGE_KEY);
        if (acknowledged !== "true" && !cancelled) {
          setMainOpen(true);
        }
      } catch {
        if (!cancelled) setMainOpen(true);
      }
    };
    const id = setTimeout(check, 0);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, []);

  const handleOk = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    setMainOpen(false);
  };

  const handleCancel = () => {
    setMainOpen(false);
    setLeavingOpen(true);
  };

  const handleLeaveSite = () => {
    setLeavingOpen(false);
    window.location.href = "https://google.com";
  };

  const handleStayOnSite = () => {
    setLeavingOpen(false);
    setMainOpen(true);
  };

  return (
    <>
      <Dialog open={mainOpen} onOpenChange={setMainOpen}>
        <DialogContent
          showCloseButton={false}
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>This website is intended for US audiences only.</DialogTitle>
            <DialogDescription>
              If you are a US-based healthcare professional, caregiver, or consumer, click OK to continue; if not, click CANCEL.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
            >
              Cancel <RightAngleIcon className="size-5" />
            </Button>
            <Button type="button" variant="default" onClick={handleOk}>
              Ok <RightAngleIcon className="size-5" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={leavingOpen} onOpenChange={setLeavingOpen}>
        <DialogContent
          showCloseButton={false}
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>You are now leaving QIVIGY.com/hcp.</DialogTitle>
            <DialogDescription>
              Would you like to proceed?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={handleStayOnSite}
            >
              Stay on site <RightAngleIcon className="size-5" />
            </Button>
            <Button type="button" variant="default" onClick={handleLeaveSite}>
              Leave Site <RightAngleIcon className="size-5" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}