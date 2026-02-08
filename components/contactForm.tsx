"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
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
import { Checkbox } from "@/components/ui/checkbox"

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
    .min(10, "Phone must be at least 10 characters.")
    .max(10, "Phone must be at most 10 characters."),
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

export function ContactForm() {
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
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  return (
    <Card className="w-full sm:max-w-md mx-auto my-8 bg-linear-to-b from-deep-orange-light to-white">
      <CardContent>
        <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="nameFirst"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${formId}-nameFirst`}>
                    First name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`${formId}-nameFirst`}
                    aria-invalid={fieldState.invalid}
                    placeholder="Jane"
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
                    Last name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`${formId}-nameLast`}
                    aria-invalid={fieldState.invalid}
                    placeholder="Doe"
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
                  <FieldLabel htmlFor={`${formId}-email`}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={`${formId}-email`}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="jane@example.com"
                    autoComplete="email"
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
                  <FieldLabel htmlFor={`${formId}-phone`}>Phone</FieldLabel>
                  <Input
                    {...field}
                    id={`${formId}-phone`}
                    type="tel"
                    aria-invalid={fieldState.invalid}
                    placeholder="5551234567"
                    autoComplete="tel"
                    maxLength={10}
                  />
                  <FieldDescription>10 digits, no formatting</FieldDescription>
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
                  <FieldLabel htmlFor={`${formId}-city`}>City</FieldLabel>
                  <Input
                    {...field}
                    id={`${formId}-city`}
                    aria-invalid={fieldState.invalid}
                    placeholder="San Francisco"
                    autoComplete="address-level2"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="state"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${formId}-state`}>State</FieldLabel>
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(v) => field.onChange(v || undefined)}
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
                  <FieldLabel htmlFor={`${formId}-zip`}>ZIP code</FieldLabel>
                  <Input
                    {...field}
                    id={`${formId}-zip`}
                    aria-invalid={fieldState.invalid}
                    placeholder="94102"
                    autoComplete="postal-code"
                    maxLength={10}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="communicationPreference"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Preferred contact method</FieldLabel>
                  <RadioGroup
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="flex gap-4"
                  >
                    <Field orientation="horizontal" className="items-center gap-2">
                      <RadioGroupItem
                        value="email"
                        id={`${formId}-comm-email`}
                      />
                      <FieldLabel htmlFor={`${formId}-comm-email`} className="font-normal cursor-pointer">
                        Email
                      </FieldLabel>
                    </Field>
                    <Field orientation="horizontal" className="items-center gap-2">
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
                <Field data-invalid={fieldState.invalid} className="flex items-start gap-2">
                  <Checkbox
                    id={`${formId}-privacy`}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="mt-0.5"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <FieldLabel htmlFor={`${formId}-privacy`} className="font-normal cursor-pointer">
                      I have read and accept the privacy notice / terms of service.
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
                <Field data-invalid={fieldState.invalid} className="flex items-start gap-2">
                  <Checkbox
                    id={`${formId}-receiveEmails`}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="mt-0.5"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <FieldLabel htmlFor={`${formId}-receiveEmails`} className="font-normal cursor-pointer">
                      I would like to receive email updates.
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
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form={formId}>
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
