import type { ReactNode } from "react";

export function SectionHeading({
  icon,
  title,
  subtitle,
  action,
  id,
}: {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="mb-5 flex items-end justify-between gap-4 scroll-mt-24">
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
          {icon}
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
