
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  color?: "cyan" | "purple" | "blue" | "green" | "red" | "amber" | "pink"; // Added more colors
  detail?: string;
  isCurrency?: boolean;
  isCount?: boolean; // For values that are counts and should not be formatted as currency or percentage
}

const colorClasses = {
  cyan: {
    bg: "bg-cyan-900/30",
    border: "border-cyan-500/50",
    text: "text-cyan-400",
    iconBg: "bg-cyan-500/20",
    iconText: "text-cyan-400",
  },
  purple: {
    bg: "bg-purple-900/30",
    border: "border-purple-500/50",
    text: "text-purple-400",
    iconBg: "bg-purple-500/20",
    iconText: "text-purple-400",
  },
  blue: {
    bg: "bg-blue-900/30",
    border: "border-blue-500/50",
    text: "text-blue-400",
    iconBg: "bg-blue-500/20",
    iconText: "text-blue-400",
  },
  green: {
    bg: "bg-green-900/30",
    border: "border-green-500/50",
    text: "text-green-400",
    iconBg: "bg-green-500/20",
    iconText: "text-green-400",
  },
   red: {
    bg: "bg-red-900/30",
    border: "border-red-500/50",
    text: "text-red-400",
    iconBg: "bg-red-500/20",
    iconText: "text-red-400",
  },
  amber: {
    bg: "bg-amber-900/30",
    border: "border-amber-500/50",
    text: "text-amber-400",
    iconBg: "bg-amber-500/20",
    iconText: "text-amber-400",
  },
   pink: {
    bg: "bg-pink-900/30",
    border: "border-pink-500/50",
    text: "text-pink-400",
    iconBg: "bg-pink-500/20",
    iconText: "text-pink-400",
  },
  default: {
    bg: "bg-slate-800/50",
    border: "border-slate-700/50",
    text: "text-slate-300",
    iconBg: "bg-slate-700/50",
    iconText: "text-slate-400",
  }
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = "default",
  detail,
  isCurrency = false,
  isCount = false,
}) => {
  const selectedColor = colorClasses[color] || colorClasses.default;

  let TrendIcon;
  let trendColorClass = "";

  if (trend === "up") {
    TrendIcon = TrendingUp;
    trendColorClass = "text-green-400";
  } else if (trend === "down") {
    TrendIcon = TrendingDown;
    trendColorClass = "text-red-400";
  } else {
    TrendIcon = Minus;
    trendColorClass = "text-slate-500";
  }
  
  const formattedValue = isCurrency
    ? `€${Number(value).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : isCount 
    ? Number(value).toLocaleString('de-DE')
    : typeof value === 'number' ? `${value}%` : value;


  return (
    <Card className={cn("shadow-xl hover:shadow-2xl transition-shadow duration-300", selectedColor.bg, selectedColor.border)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
        <div className={cn("p-1.5 rounded-md", selectedColor.iconBg)}>
           <Icon className={cn("h-5 w-5", selectedColor.iconText)} />
        </div>
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <div className={cn("text-3xl font-bold", selectedColor.text)}>{formattedValue}</div>
        <div className="flex items-center text-xs text-slate-500 mt-1">
            {trend && <TrendIcon className={cn("h-3.5 w-3.5 mr-1", trendColorClass)} />}
            <span>{detail}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
