import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        // secondary:
        //   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        "ghost-outline":
          "w-fit font-open-sans bg-transparent border border-white hover:bg-accent hover:text-accent-foreground font-bold px-3! rounded-sm!",
        link: "text-primary underline-offset-4 hover:underline",
        default: "border-2 border-navy bg-navy text-white text-lg rounded-full px-6! py-5! uppercase font-bold shadow-lg hover:bg-navy-dark hover:border-navy-dark transition-all",
        secondary: "border-2 border-navy text-navy text-lg rounded-full px-6! py-5! uppercase font-bold shadow-lg hover:border-navy-dark hover:text-navy-dark transition-all",
        large: "border-2 border-navy bg-navy font-normal text-white text-2xl rounded-full px-6! py-5! shadow-lg hover:bg-navy-dark hover:border-navy-dark transition-all",
        home: "border-2 border-navy bg-navy text-white text-lg rounded-[20px] px-6! md:px-13! py-6! shadow-lg hover:bg-navy-dark hover:border-navy-dark transition-all whitespace-normal! text-left! leading-none!",
        provider: "border-2 border-navy bg-navy text-white underline truncate text-lg rounded-full px-6! py-5! font-bold shadow-lg hover:bg-navy-dark hover:border-navy-dark transition-all lowercase w-full min-w-0",

      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    href?: string
    target?: string
    rel?: string
  }

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  href,
  type,
  ...props
}: ButtonProps) {
  const shared = {
    "data-slot": "button",
    "data-variant": variant,
    "data-size": size,
    className: cn(buttonVariants({ variant, size, className })),
  }

  if (href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- omit type when rendering as Link
    const { type: _omit, ...rest } = props as typeof props & { type?: string }
    return (
      <Link
        {...shared}
        href={href}
        {...(rest as Omit<React.ComponentProps<typeof Link>, "href">)}
      />
    )
  }

  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      {...shared}
      type={type ?? "button"}
      {...props}
    />
  )
}

export { Button, buttonVariants }
