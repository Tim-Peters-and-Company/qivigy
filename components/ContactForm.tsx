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
import { RightAngleIcon } from "./icons/rightAngle"

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
const formSchema = z.object({
  nameFirst: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
  nameLast: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
  email: z
    .string()
    .email("Invalid email address."),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 numbers.")
    .max(10, "Phone must be at most 10 numbers."),
  city: z
    .string()
    .min(2, "City must be at least 2 characters.")
    .max(100, "City must be at most 100 characters."),
  state: z.enum(stateValues as [string, ...string[]], {
    message: "Please select a state.",
  }),
  zip: z
    .string()
    .min(5, "ZIP must be at least 5 characters.")
    .max(10, "ZIP must be at most 10 characters."),
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

function formatPhoneDisplay(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10)
  if (digits.length === 0) return ""
  if (digits.length <= 3) return digits.length === 3 ? `(${digits})` : `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)})-${digits.slice(3)}`
  return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6)}`
}

export function ContactForm() {
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)
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

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
    setSuccessDialogOpen(true)
  }

  return (
    <>
      <Card className="w-full sm:max-w-2xl mx-auto my-8 bg-linear-to-b from-deep-orange-light to-white">
        <CardContent>
          <form
            id={formId}
            onSubmit={form.handleSubmit(onSubmit)}
            data-netlify-recaptcha="true"
            data-netlify="true"
          >
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
            <div data-netlify-recaptcha="true"></div>
            <Field orientation="horizontal">
              <Button type="submit" form={formId} className="w-full">
                Submit
              </Button>
            </Field>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setSuccessDialogOpen(true)}
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
