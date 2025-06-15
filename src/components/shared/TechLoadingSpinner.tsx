
"use client";
import { Loader2 } from "lucide-react";

const TechLoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-16 h-16 text-cyan-500 animate-spin" />
      <p className="text-slate-300 text-lg font-medium">Daten werden geladen...</p>
    </div>
  );
};

export default TechLoadingSpinner;
