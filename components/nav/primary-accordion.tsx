import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PrimaryNav } from "@/content/header"
import Link from "next/link"

function navValue(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-")
}

export default function PrimaryAccordion() {
  const firstWithChildren = PrimaryNav.find((n) => n.children?.length)?.label

  return (
    <nav className="flex flex-col">
      {PrimaryNav.map((nav) => {
        if (nav.children?.length) {
          const value = navValue(nav.label)
          const isFirst = nav.label === firstWithChildren
          return (
            <Accordion
              key={nav.label}
              type="multiple"
              defaultValue={isFirst ? [value] : []}
            >
              <AccordionItem value={value}>
                <AccordionTrigger>{nav.label}</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-2 pl-1">
                    {nav.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="text-sm hover:underline"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        }
        return (
          <Link
            key={nav.label}
            href={nav.href ?? "/"}
            className="py-3 text-sm font-medium hover:underline"
          >
            {nav.label}
          </Link>
        )
      })}
    </nav>
  )
}