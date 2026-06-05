"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Car } from "@/data/site";

interface CompareContextType {
  selected: Car[];
  toggleCar: (car: Car) => void;
  removeCar: (id: string) => void;
  clearAll: () => void;
  isSelected: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be inside CompareProvider");
  return ctx;
}

export default function CompareProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Car[]>([]);

  const toggleCar = useCallback((car: Car) => {
    setSelected((prev) => {
      const exists = prev.find((c) => c.id === car.id);
      if (exists) return prev.filter((c) => c.id !== car.id);
      if (prev.length >= 3) return prev;
      return [...prev, car];
    });
  }, []);

  const removeCar = useCallback((id: string) => {
    setSelected((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearAll = useCallback(() => setSelected([]), []);

  const isSelected = useCallback(
    (id: string) => selected.some((c) => c.id === id),
    [selected]
  );

  return (
    <CompareContext.Provider value={{ selected, toggleCar, removeCar, clearAll, isSelected }}>
      {children}
    </CompareContext.Provider>
  );
}
