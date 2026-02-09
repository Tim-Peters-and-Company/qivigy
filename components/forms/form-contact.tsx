"use client"

import { useState, useRef, useEffect } from "react"
import Script from "next/script"
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
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Checkbox } from "@/components/ui/checkbox"
import { RightAngleIcon } from "@/components/icons/rightAngle"

const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District of Columbia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
] as const

const stateValues = US_STATES.map((s) => s.value)
const zipRegex = /^\d{5}(-\d{4})?$/
const formSchema = z.object({
  nameFirst: z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().min(2, "Name must be at least 2 characters.").max(100, "Name must be at most 100 characters.")),
  nameLast: z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().min(2, "Name must be at least 2 characters.").max(100, "Name must be at most 100 characters.")),
  email: z
    .string()
    .transform((s) => s.trim().toLowerCase())
    .pipe(z.string().email("Invalid email address.")),
  phone: z
    .string()
    .transform((s) => s.replace(/\D/g, "").slice(0, 10))
    .pipe(z.string().length(10, "Phone must be exactly 10 digits.")),
  city: z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().min(2, "City must be at least 2 characters.").max(100, "City must be at most 100 characters.")),
  state: z.enum(stateValues as [string, ...string[]], {
    message: "Please select a state.",
  }),
  zip: z
    .string()
    .transform((s) => s.trim().replace(/\s+/g, ""))
    .pipe(z.string().regex(zipRegex, "ZIP must be 5 digits or 5+4 (e.g. 12345-6789).")),
  communicationPreference: z.enum(["email", "phone"], {
    message: "Please select a communication preference.",
  }),
  privacyNotice: z.boolean({
    message: "You must accept the terms of service.",
  }),
  receiveEmails: z.boolean({
    message: "You must opt in to receive emails.",
  }),
})

const formId = "contact-form"
/** Must match form name in public/__forms.html for Netlify Forms */
const NETLIFY_FORM_NAME = "contact"
/** reCAPTCHA v2 site key (set NEXT_PUBLIC_SITE_RECAPTCHA_KEY). Netlify uses SITE_RECAPTCHA_KEY for server-side verify. */
const RECAPTCHA_SITE_KEY = typeof process.env.NEXT_PUBLIC_SITE_RECAPTCHA_KEY === "string"
  ? process.env.NEXT_PUBLIC_SITE_RECAPTCHA_KEY
  : ""

function formatPhoneDisplay(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10)
  if (digits.length === 0) return ""
  if (digits.length <= 3) return digits.length === 3 ? `(${digits})` : `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)})-${digits.slice(3)}`
  return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6)}`
}

declare global {
  interface Window {
    grecaptcha?: { render: (container: HTMLElement, options: { sitekey: string }) => number }
    __contactRecaptchaOnLoad?: () => void
  }
}

export function ContactForm() {
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const recaptchaContainerRef = useRef<HTMLDivElement>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameFirst: "",
      nameLast: "",
      email: "",
      phone: "",
      city: "",
      state: undefined,
      zip: "",
      communicationPreference: undefined,
      privacyNotice: false,
      receiveEmails: false,
    },
    mode: "onChange",
  })

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || !recaptchaContainerRef.current) return
    const render = () => {
      if (recaptchaContainerRef.current && window.grecaptcha) {
        try {
          window.grecaptcha.render(recaptchaContainerRef.current, { sitekey: RECAPTCHA_SITE_KEY })
        } catch {
          // already rendered or container gone
        }
      }
    }
    window.__contactRecaptchaOnLoad = render
    if (window.grecaptcha) render()
    return () => {
      delete window.__contactRecaptchaOnLoad
    }
  }, [])

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setSubmitError(null)
    setIsSubmitting(true)
    try {
      const recaptcha = document.querySelector<HTMLTextAreaElement>('[name="g-recaptcha-response"]')?.value?.trim()
      if (RECAPTCHA_SITE_KEY && !recaptcha) {
        setSubmitError("Please complete the security check before submitting.")
        setIsSubmitting(false)
        return
      }

      const formEl = document.getElementById(formId) as HTMLFormElement | null
      const honeypot = formEl?.elements.namedItem("bot-field") as HTMLInputElement | null
      if (honeypot?.value?.trim()) {
        setSubmitError("Something went wrong. Please try again or call 1-855-353-7466.")
        setIsSubmitting(false)
        return
      }

      const params = new URLSearchParams()
      params.set("form-name", NETLIFY_FORM_NAME)
      params.set("bot-field", honeypot?.value ?? "")
      params.set("nameFirst", data.nameFirst.trim())
      params.set("nameLast", data.nameLast.trim())
      params.set("email", data.email.trim().toLowerCase())
      params.set("phone", data.phone)
      params.set("city", data.city.trim())
      params.set("state", data.state)
      params.set("zip", data.zip.trim())
      params.set("communicationPreference", data.communicationPreference)
      if (data.privacyNotice) params.set("privacyNotice", "on")
      if (data.receiveEmails) params.set("receiveEmails", "on")
      if (recaptcha) params.set("g-recaptcha-response", recaptcha)

      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      })
      if (!res.ok) throw new Error("Submission failed.")
      setSuccessDialogOpen(true)
      form.reset()
    } catch {
      setSubmitError("Something went wrong. Please try again or call 1-855-353-7466.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Card className="w-full sm:max-w-2xl mx-auto my-8 bg-linear-to-b from-deep-orange-light to-white">
        <CardContent>
          <form
            id={formId}
            name={NETLIFY_FORM_NAME}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
            {/* Honeypot: hidden from users, bots fill it; Netlify rejects if non-empty */}
            <div className="absolute -left-[9999px] top-0 opacity-0 pointer-events-none" aria-hidden="true">
              <label htmlFor={`${formId}-bot-field`}>Don&apos;t fill this out if you&apos;re human</label>
              <input id={`${formId}-bot-field`} name="bot-field" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <FieldGroup>
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
                      required={true}
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
                      required={true}
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
                    <FieldLabel htmlFor={`${formId}-email`}>EMAIL*</FieldLabel>
                    <Input
                      {...field}
                      id={`${formId}-email`}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="name@example.com"
                      autoComplete="email"
                      required={true}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`${formId}-phone`}>PHONE*</FieldLabel>
                    <InputGroup className="">
                      <InputGroupInput id={`${formId}-phone`}
                        type="tel"
                        aria-invalid={fieldState.invalid}
                        placeholder="(000)-000-0000"
                        autoComplete="tel"
                        required={true}
                        value={formatPhoneDisplay(field.value)}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "").slice(0, 10)
                          field.onChange(digits)
                        }}
                        onBlur={field.onBlur}
                        ref={field.ref} />
                      <InputGroupAddon
                        align="inline-start"
                        className="bg-[#D9D9D9] pe-3 h-12 text-foreground font-bold border-r-2 border-navy"
                      >
                        +1
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`${formId}-city`}>CITY*</FieldLabel>
                    <Input
                      {...field}
                      id={`${formId}-city`}
                      aria-invalid={fieldState.invalid}
                      autoComplete="address-level2"
                      required={true}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="lg:flex lg:gap-4">
                <Controller
                  name="state"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`${formId}-state`}>STATE*</FieldLabel>
                      <Select
                        value={field.value ?? ""}
                        onValueChange={(v) => field.onChange(v || undefined)}
                        required={true}
                      >
                        <SelectTrigger
                          id={`${formId}-state`}
                          aria-invalid={fieldState.invalid}
                          className="w-full"
                        >
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {US_STATES.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="zip"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`${formId}-zip`}>ZIP CODE*</FieldLabel>
                      <Input
                        {...field}
                        id={`${formId}-zip`}
                        aria-invalid={fieldState.invalid}
                        autoComplete="postal-code"
                        maxLength={10}
                        required={true}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Controller
                name="communicationPreference"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="font-bold text-lg normal-case text-navy">Preferred method of communication*</FieldLabel>
                    <RadioGroup
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                      className="flex gap-8"
                    >
                      <Field orientation="horizontal" className="items-center gap-2 w-min">
                        <RadioGroupItem
                          value="email"
                          id={`${formId}-comm-email`}
                        />
                        <FieldLabel htmlFor={`${formId}-comm-email`} className="font-normal cursor-pointer">
                          Email
                        </FieldLabel>
                      </Field>
                      <Field orientation="horizontal" className="items-center gap-2 w-min">
                        <RadioGroupItem
                          value="phone"
                          id={`${formId}-comm-phone`}
                        />
                        <FieldLabel htmlFor={`${formId}-comm-phone`} className="font-normal cursor-pointer">
                          Phone
                        </FieldLabel>
                      </Field>
                    </RadioGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="privacyNotice"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} orientation="horizontal" className="flex flex-row items-start gap-2">
                    <Checkbox
                      id={`${formId}-privacy`}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <FieldLabel htmlFor={`${formId}-privacy`} className="font-normal cursor-pointer">
                        I acknowledge that I have received and read Kedrion’s Privacy Notice and that information provided is subject to that policy.*
                      </FieldLabel>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />
              <Controller
                name="receiveEmails"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} orientation="horizontal" className="flex flex-row items-start gap-2">
                    <Checkbox
                      id={`${formId}-receiveEmails`}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <FieldLabel htmlFor={`${formId}-receiveEmails`} className="font-normal cursor-pointer">
                        By checking this box, you agree to receive communications relating to QIVIGY and its indicated conditions. The information you provide will be used solely for this purpose. You can stop communications from Kedrion at any time by following the instructions on the communications.*
                      </FieldLabel>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-2 w-full">
            {RECAPTCHA_SITE_KEY && (
              <>
                <Script
                  src={`https://www.google.com/recaptcha/api.js?onload=__contactRecaptchaOnLoad&render=explicit`}
                  strategy="lazyOnload"
                />
                <div ref={recaptchaContainerRef} data-netlify-recaptcha="true" aria-label="Security check" />
              </>
            )}
            {submitError && (
              <p className="text-destructive text-sm" role="alert">
                {submitError}
              </p>
            )}
            <Field orientation="horizontal">
              <Button
                type="submit"
                form={formId}
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting…" : "Submit"}
              </Button>
            </Field>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setSuccessDialogOpen(true)}
              disabled={isSubmitting}
            >
              Test submit dialog
            </Button>
            <p><span className="text-xs text-navy">*Indicates required field.</span></p>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thank you for requesting more information about QIVIGY®. </DialogTitle>
            <DialogDescription>
              You may also call Kedrion Biopharma toll-free at <a href="tel:+18553537466" className="font-semibold text-navy underline focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded">1-855-353-7466</a> for assistance.{" "}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="">
            <DialogClose asChild>
              <Button type="button" variant="default">Close <RightAngleIcon className="size-5" /></Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
