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
import { RightAngleIcon } from "@/components/icons/rightAngle";
import { PatientSupportCopayProgram, PatientSupportCopayReimbursement } from "@/content/patient-support";

export default function PatientSupport() {
  const [open, setOpen] = useState(true);

  return (
    <PageLayout pageTitle="Patient Support">

      <div className="page-width">
        <PatientSupportCopayProgram />
      </div>

      <div className="arched-top relative pt-8">
        <div className="page-width">
          <PatientSupportCopayReimbursement />
          <div className="bg-linear-to-b from-deep-orange-light to-white absolute top-0 left-0 h-[300px] w-full -z-10"></div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger> */}
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="">
            <Button type="button" variant="secondary">Cancel <RightAngleIcon className="size-5" /></Button>
            <DialogClose asChild>
              <Button type="button" variant="default">Ok <RightAngleIcon className="size-5" /></Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}