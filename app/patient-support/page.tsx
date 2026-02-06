"use client";

import { useState } from "react";
import PageLayout from "@/components/page-layout";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const RightAngleIcon = ({ className }: { className?: string }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="225" height="385" viewBox="0 0 225 385" fill="none">
      <path d="M214.675 169.475C227.175 181.975 227.175 202.275 214.675 214.775L54.675 374.775C42.175 387.275 21.875 387.275 9.375 374.775C-3.125 362.275 -3.125 341.975 9.375 329.475L146.775 192.075L9.47499 54.675C-3.02501 42.175 -3.02501 21.875 9.47499 9.375C21.975 -3.125 42.275 -3.125 54.775 9.375L214.775 169.375L214.675 169.475Z" fill="currentColor" />
    </svg>
  );
};
export default function PatientSupport() {
  const [open, setOpen] = useState(true);

  return (
    <PageLayout pageTitle="Patient Support">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="">
            <Button type="button" variant="dialog-outline">Cancel <RightAngleIcon className="size-5" /></Button>
            <DialogClose asChild>
              <Button type="button" variant="dialog-primary">Ok <RightAngleIcon className="size-5" /></Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}