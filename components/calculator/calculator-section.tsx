"use client"

import { useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { CalculatorTabs } from '@/content/calculator'
import { cn } from '@/lib/utils'
import { CalculatorTabProvider } from '@/components/calculator/calculator-tabs-context'

export default function CalculatorSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <CalculatorTabProvider setSelectedIndex={setSelectedIndex}>
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabList
          className="flex gap-2"
        >
          {CalculatorTabs.map((tab) => (
            <Tab
              key={tab.label}
              className={cn(
                "bg-white text-navy",
                "data-selected:bg-navy data-selected:text-white",
                'text-lg font-bold',
                "border-2 border-navy rounded-full px-6 py-2",
              )}
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {CalculatorTabs.map((tab) => (
            <TabPanel key={tab.label}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </CalculatorTabProvider>
  )
}
