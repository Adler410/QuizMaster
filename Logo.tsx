import { Link } from "@tanstack/react-router";
import { Brain } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand shadow-glow">
        <Brain className="h-5 w-5 text-white" strokeWidth={2.4} />
      </span>
      <span className="text-xl font-bold tracking-tight">
        Quiz<span className="text-gradient">Master</span>
      </span>
    </Link>
  );
}
