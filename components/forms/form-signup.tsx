"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RightAngleIcon } from "@/components/icons/rightAngle"

const formSchema = z.object({
  nameFirst: z
    .string()
    .transform((s) => s.trim())
    .pipe(
      z
        .string()
        .min(1, "Please enter first name.")
        .max(100, "Please enter first name."),
    ),
  nameLast: z
    .string()
    .transform((s) => s.trim())
    .pipe(
      z
        .string()
        .min(1, "Please enter last name.")
        .max(100, "Please enter last name."),
    ),
  email: z
    .string()
    .transform((s) => s.trim().toLowerCase())
    .pipe(z.string().email("Please enter email address.")),
  specialty: z
    .string()
    .transform((s) => s.trim())
    .pipe(
      z
        .string()
        .min(2, "Please select a specialty.")
        .max(100, "Please select a specialty."),
    ),
  privacyNotice: z
    .boolean()
    .refine((val) => val === true, {
      message: "Please check this box if you want to proceed.",
    }),
  receiveCommunications: z
    .boolean()
    .refine((val) => val === true, {
      message: "Please check this box if you want to proceed.",
    }),
})

const formId = "signup-form"
/** Must match form name in public/__forms.html for Netlify Forms */
const NETLIFY_FORM_NAME = "signup"

export function SignupForm() {
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameFirst: "",
      nameLast: "",
      email: "",
      specialty: "",
      privacyNotice: false,
      receiveCommunications: false,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setSubmitError(null)
    setIsSubmitting(true)
    try {
      const formEl = document.getElementById(formId) as HTMLFormElement | null
      const honeypot = formEl?.elements.namedItem(
        "bot-field",
      ) as HTMLInputElement | null
      if (honeypot?.value?.trim()) {
        setSubmitError(
          "Something went wrong. Please try again or call 855-353-7466.",
        )
        setIsSubmitting(false)
        return
      }

      const params = new URLSearchParams()
      params.set("form-name", NETLIFY_FORM_NAME)
      params.set("bot-field", honeypot?.value ?? "")
      params.set("nameFirst", data.nameFirst.trim())
      params.set("nameLast", data.nameLast.trim())
      params.set("email", data.email.trim().toLowerCase())
      params.set("specialty", data.specialty.trim())
      if (data.privacyNotice) params.set("privacyNotice", "on")
      if (data.receiveCommunications)
        params.set("receiveCommunications", "on")

      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      })
      if (!res.ok) throw new Error("Submission failed.")
      setSuccessDialogOpen(true)
      form.reset()
    } catch {
      setSubmitError(
        "Something went wrong. Please try again.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Card className="w-full mx-auto my-8 bg-linear-to-b from-deep-orange-light to-white border-0 shadow-xl">
        <CardContent className="pt-0 md:px-16 px-4">
          <p className="mb-6 text-sm text-navy">
            Please fill in the information below.
          </p>
          <form
            id={formId}
            name={NETLIFY_FORM_NAME}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
            {/* Honeypot: hidden from users, bots fill it; Netlify rejects if non-empty */}
            <div
              className="absolute -left-[9999px] top-0 opacity-0 pointer-events-none"
              aria-hidden="true"
            >
              <label htmlFor={`${formId}-bot-field`}>
                Don&apos;t fill this out if you&apos;re human
              </label>
              <input
                id={`${formId}-bot-field`}
                name="bot-field"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="md:grid md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.4fr)] md:gap-10">
              <FieldGroup className="space-y-0">
                <Controller
                  name="nameFirst"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`${formId}-nameFirst`}>
                        FIRST NAME*
                      </FieldLabel>
                      <Input
                        {...field}
                        id={`${formId}-nameFirst`}
                        aria-invalid={fieldState.invalid}
                        autoComplete="given-name"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="nameLast"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`${formId}-nameLast`}>
                        LAST NAME*
                      </FieldLabel>
                      <Input
                        {...field}
                        id={`${formId}-nameLast`}
                        aria-invalid={fieldState.invalid}
                        autoComplete="family-name"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`${formId}-email`}>
                        EMAIL ADDRESS*
                      </FieldLabel>
                      <Input
                        {...field}
                        id={`${formId}-email`}
                        type="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="EMAIL ADDRESS"
                        autoComplete="email"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="specialty"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`${formId}-specialty`}>
                        I AM A*
                      </FieldLabel>
                      <Input
                        {...field}
                        id={`${formId}-specialty`}
                        aria-invalid={fieldState.invalid}
                        placeholder="ENTER YOUR SPECIALTY"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <div className="mt-8 md:mt-0 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <Controller
                    name="privacyNotice"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        orientation="horizontal"
                        className="flex flex-row items-start gap-2"
                      >
                        <Checkbox
                          id={`${formId}-privacy`}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-invalid={fieldState.invalid}
                        />
                        <div className="grid gap-1.5 leading-snug text-xs md:text-sm">
                          <FieldLabel
                            htmlFor={`${formId}-privacy`}
                            className="font-normal cursor-pointer block"
                          >
                            I acknowledge that I have received and read Kedrion&apos;s{" "}
                            <a
                              href="/privacy-notice"
                              className="underline text-navy font-semibold"
                            >
                              Privacy Notice
                            </a>{" "}
                            and that information provided is subject to that policy.*
                          </FieldLabel>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </div>
                      </Field>
                    )}
                  />

                  <Controller
                    name="receiveCommunications"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        orientation="horizontal"
                        className="flex flex-row items-start gap-2"
                      >
                        <Checkbox
                          id={`${formId}-receiveCommunications`}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-invalid={fieldState.invalid}
                        />
                        <div className="grid gap-1.5 leading-snug text-xs md:text-sm">
                          <FieldLabel
                            htmlFor={`${formId}-receiveCommunications`}
                            className="font-normal cursor-pointer"
                          >
                            By checking this box, you agree to receive communications
                            relating to QIVIGY and its indicated conditions. The
                            information you provide will be used solely for this
                            purpose. You can stop communications from Kedrion at any
                            time by following the instructions on the communications.*
                          </FieldLabel>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </div>
                      </Field>
                    )}
                  />
                </div>

                <div className="mt-4 flex flex-col items-stretch gap-2">
                  {submitError && (
                    <p className="text-destructive text-sm" role="alert">
                      {submitError}
                    </p>
                  )}
                  <div className="flex items-center justify-between gap-4">
                    <Button
                      type="submit"
                      form={formId}
                      className="min-w-32 w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting…" : "Submit"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <p className="text-xs text-navy mt-8!">
            *Indicates required field.
          </p>
        </CardContent>
        <CardFooter />
      </Card>

      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Thank you for requesting more information about QIVIGY<sup>®</sup>.
            </DialogTitle>
            <DialogDescription>
              For Medical Information requests, including AMCP Dossier requests, please call <a
                href="tel:+18553537466"
                className="font-semibold focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded"
              >
                866-398-0825
              </a>, or email <a
                href="mailto:US_MedicalInfo@kedrion.com"
                className="font-semibold focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded"
              >
                US_MedicalInfo@kedrion.com
              </a>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="default">
                Close <RightAngleIcon className="size-5" />
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

