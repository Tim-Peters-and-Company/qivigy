"use client"

import React, { createContext, useContext } from "react";

type CalculatorTabContextValue = {
  setSelectedIndex: (index: number) => void;
};

const CalculatorTabContext = createContext<CalculatorTabContextValue | null>(null);

type CalculatorTabProviderProps = {
  setSelectedIndex: (index: number) => void;
  children: React.ReactNode;
};

export function CalculatorTabProvider({ setSelectedIndex, children }: CalculatorTabProviderProps) {
  return (
    <CalculatorTabContext.Provider value={{ setSelectedIndex }}>
      {children}
    </CalculatorTabContext.Provider>
  );
}

export function useCalculatorTabs() {
  const context = useContext(CalculatorTabContext);

  if (!context) {
    throw new Error("useCalculatorTabs must be used within a CalculatorTabProvider");
  }

  return context;
}

