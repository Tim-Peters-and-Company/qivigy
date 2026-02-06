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

type PrimaryAccordionProps = {
  onNavigate?: () => void
}

export default function PrimaryAccordion({ onNavigate }: PrimaryAccordionProps) {
  return (
    <nav className="flex flex-col bg-navy text-white border-t border-white font-open-sans">
      {PrimaryNav.map((nav) => {
        if (nav.children?.length) {
          const value = navValue(nav.label)
          return (
            <Accordion
              key={nav.label}
              type="multiple"
            >
              <AccordionItem value={value}>
                <AccordionTrigger className="p-4 text-sm font-medium hover:bg-navy-dark hover:no-underline transition-all">{nav.label}</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-0 bg-deep-orange-light text-foreground border-b-2 border-t-2 border-deep-orange font-sans">
                    {nav.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block p-4 text-sm font-medium hover:bg-deep-orange-medium transition-all"
                          onClick={onNavigate}
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
            className="p-4 text-sm font-medium hover:bg-navy-dark transition-all"
            onClick={onNavigate}
          >
            {nav.label}
          </Link>
        )
      })}
    </nav>
  )
}