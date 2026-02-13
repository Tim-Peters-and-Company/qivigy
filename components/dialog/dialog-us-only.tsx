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
import { DialogLeavingSiteData, DialogUSOnlyData } from "@/content/dialogs";

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
    window.location.href = DialogLeavingSiteData.url;
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
            <DialogTitle>{DialogUSOnlyData.title}</DialogTitle>
            <DialogDescription>
              {DialogUSOnlyData.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col md:flex-row">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
            >
              {DialogUSOnlyData.cancelText} <RightAngleIcon className="size-5" />
            </Button>
            <Button type="button" variant="default" onClick={handleOk}>
              {DialogUSOnlyData.okText} <RightAngleIcon className="size-5" />
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
            <DialogTitle>{DialogLeavingSiteData.title}</DialogTitle>
            <DialogDescription>
              {DialogLeavingSiteData.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col md:flex-row">
            <Button
              type="button"
              variant="secondary"
              onClick={handleStayOnSite}
            >
              {DialogLeavingSiteData.cancelText} <RightAngleIcon className="size-5" />
            </Button>
            <Button type="button" variant="default" onClick={handleLeaveSite}>
              {DialogLeavingSiteData.okText} <RightAngleIcon className="size-5" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}