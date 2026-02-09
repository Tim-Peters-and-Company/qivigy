import { cn } from "@/lib/utils";

export type InfusionMode = "first" | "subsequent";

const TABS: { id: InfusionMode; label: string }[] = [
  { id: "first", label: "FIRST INFUSION" },
  { id: "subsequent", label: "SUBSEQUENT INFUSIONS" },
];

type Props = {
  activeMode: InfusionMode | null;
  onChange: (mode: InfusionMode) => void;
};

export function InfusionModeTabs({ activeMode, onChange }: Props) {
  return (
    <div className="mb-2 flex gap-2 border-b border-deep-orange">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            activeMode === tab.id
              ? "border-b-2 border-deep-orange text-white bg-deep-orange pb-2 font-semibold"
              : "pb-2 text-foreground hover:bg-deep-orange-light",
            "px-4 py-2 rounded-t-lg"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
