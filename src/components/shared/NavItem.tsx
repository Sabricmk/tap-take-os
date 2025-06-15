
"use client";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ease-in-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
        active
          ? "bg-gradient-to-r from-cyan-600/30 to-blue-600/30 text-cyan-300 border border-cyan-500/50 shadow-lg"
          : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200"
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0", active ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300")} />
      <span className="truncate">{label}</span>
    </button>
  );
};

export default NavItem;
