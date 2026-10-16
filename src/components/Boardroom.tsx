import { Coins, Settings2, TrendingUp, Cpu, Scale } from "lucide-react";

export const AREAS = [
  { name: "Money", icon: Coins, items: ["Profitability", "Cash flow", "Pricing", "Budgeting", "Financial risk", "Investment return"] },
  { name: "Operations", icon: Settings2, items: ["People", "Capacity", "Workload", "Processes", "Service delivery", "Business resilience"] },
  { name: "Market", icon: TrendingUp, items: ["Customers", "Competition", "Sales", "Marketing", "Brand positioning", "Gibraltar market conditions"] },
  { name: "Technology", icon: Cpu, items: ["IT systems", "Cybersecurity", "Data", "Automation", "Microsoft 365", "AI opportunities"] },
  { name: "Rules", icon: Scale, items: ["Employment obligations", "Regulation", "Data protection", "Licensing", "Compliance"] },
] as const;

export function areaIcon(name: string) {
  return AREAS.find((a) => a.name === name)?.icon ?? Coins;
}
