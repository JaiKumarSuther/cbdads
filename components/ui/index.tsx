import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

// ─── Badge ─────────────────────────────────────────────────────────────────────

type BadgeVariant =
  | "amber" | "cyan" | "emerald" | "rose" | "violet"
  | "outline" | "ghost";

const badgeStyles: Record<BadgeVariant, string> = {
  amber:   "bg-amber-500/10 text-amber-400 border-amber-500/25",
  cyan:    "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  rose:    "bg-rose-500/10 text-rose-400 border-rose-500/25",
  violet:  "bg-violet-500/10 text-violet-400 border-violet-500/25",
  outline: "bg-transparent text-text-secondary border-border",
  ghost:   "bg-canvas-tertiary text-text-secondary border-transparent",
};

export function Badge({
  variant = "outline",
  children,
  className,
}: {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded border",
        badgeStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// ─── Status Badge ──────────────────────────────────────────────────────────────

const statusMap: Record<string, { label: string; variant: BadgeVariant; dot?: string }> = {
  active:         { label: "Active",        variant: "emerald", dot: "bg-emerald-400" },
  expiring:       { label: "Expiring",      variant: "amber",   dot: "bg-amber-400" },
  "under-review": { label: "Under Review",  variant: "cyan",    dot: "bg-cyan-400" },
  draft:          { label: "Draft",         variant: "ghost",   dot: "bg-text-tertiary" },
  revoked:        { label: "Revoked",       variant: "rose",    dot: "bg-rose-400" },
  "drift-flagged":{ label: "Drift Flagged", variant: "rose",    dot: "bg-rose-400" },
  open:           { label: "Open",          variant: "rose" },
  reviewing:      { label: "Reviewing",     variant: "amber" },
  monitoring:     { label: "Monitoring",    variant: "cyan" },
  resolved:       { label: "Resolved",      variant: "emerald" },
  done:           { label: "Done",          variant: "emerald" },
  "in-progress":  { label: "In Progress",   variant: "cyan" },
  restricted:     { label: "Restricted",    variant: "rose" },
  success:        { label: "Success",       variant: "emerald" },
  flagged:        { label: "Flagged",       variant: "amber" },
  blocked:        { label: "Blocked",       variant: "rose" },
};

export function StatusBadge({ status }: { status: string }) {
  const s = statusMap[status] ?? { label: status, variant: "outline" as BadgeVariant };
  return (
    <Badge variant={s.variant}>
      {s.dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", s.dot)} />
      )}
      {s.label}
    </Badge>
  );
}

// ─── Priority Badge ────────────────────────────────────────────────────────────

const priorityMap: Record<string, { label: string; variant: BadgeVariant }> = {
  urgent: { label: "Urgent", variant: "rose" },
  high:   { label: "High",   variant: "amber" },
  medium: { label: "Medium", variant: "cyan" },
  low:    { label: "Low",    variant: "ghost" },
};

export function PriorityBadge({ priority }: { priority: string }) {
  const p = priorityMap[priority] ?? { label: priority, variant: "outline" as BadgeVariant };
  return <Badge variant={p.variant}>{p.label}</Badge>;
}

// ─── StatCard ──────────────────────────────────────────────────────────────────

const accentMap: Record<string, { border: string; text: string; bg: string }> = {
  amber:   { border: "border-amber-500/20",   text: "text-amber-400",   bg: "bg-amber-500/5" },
  cyan:    { border: "border-cyan-500/20",    text: "text-cyan-400",    bg: "bg-cyan-500/5" },
  emerald: { border: "border-emerald-500/20", text: "text-emerald-400", bg: "bg-emerald-500/5" },
  rose:    { border: "border-rose-500/20",    text: "text-rose-400",    bg: "bg-rose-500/5" },
  violet:  { border: "border-violet-500/20",  text: "text-violet-400",  bg: "bg-violet-500/5" },
};

export function StatCard({
  label,
  value,
  change,
  trend,
  accent = "amber",
  className,
}: {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  accent?: string;
  className?: string;
}) {
  const a = accentMap[accent] ?? accentMap.amber;
  return (
    <div
      className={cn(
        "bg-canvas-secondary border rounded-xl p-5 hover:border-border-strong transition-colors",
        a.border,
        className
      )}
    >
      <p className="text-[11px] font-mono uppercase tracking-widest text-text-tertiary mb-3">
        {label}
      </p>
      <p className={cn("font-display text-3xl font-600 tracking-tight", a.text)}>
        {value}
      </p>
      {change && (
        <div className="mt-2 flex items-center gap-1.5">
          {trend === "up" ? (
            <TrendingUp size={11} className="text-emerald-400" />
          ) : (
            <TrendingDown size={11} className="text-rose-400" />
          )}
          <span className={cn("text-[11px] font-mono", trend === "up" ? "text-emerald-400" : "text-rose-400")}>
            {change}
          </span>
          <span className="text-[11px] text-text-tertiary">vs last 30d</span>
        </div>
      )}
    </div>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────────

export function SectionHeader({
  label,
  title,
  description,
  children,
}: {
  label?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        {label && (
          <p className="text-[10px] font-mono uppercase tracking-widest text-amber-400/70 mb-1">
            {label}
          </p>
        )}
        <h1 className="font-display text-xl font-600 text-text-primary tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
    </div>
  );
}

// ─── Table ─────────────────────────────────────────────────────────────────────

export function Table({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left text-[10px] font-mono uppercase tracking-widest text-text-tertiary pb-3 pr-6 font-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">{children}</tbody>
      </table>
    </div>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────────

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-canvas-secondary border border-border rounded-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

const avatarColors: Record<string, string> = {
  amber:   "bg-amber-500/20 text-amber-400 border-amber-500/30",
  cyan:    "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  rose:    "bg-rose-500/20 text-rose-400 border-rose-500/30",
  violet:  "bg-violet-500/20 text-violet-400 border-violet-500/30",
};

export function Avatar({
  initials,
  color = "amber",
  size = "sm",
}: {
  initials: string;
  color?: string;
  size?: "sm" | "md";
}) {
  const c = avatarColors[color] ?? avatarColors.amber;
  return (
    <div
      className={cn(
        "rounded-full border flex items-center justify-center font-mono font-500 shrink-0",
        size === "sm" ? "w-7 h-7 text-[10px]" : "w-9 h-9 text-xs",
        c
      )}
    >
      {initials}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-16 text-center">
      <p className="text-text-tertiary text-sm font-mono">{message}</p>
    </div>
  );
}

// ─── Page wrapper ─────────────────────────────────────────────────────────────

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className="p-8 max-w-7xl mx-auto animate-fade-in">{children}</div>;
}

// ─── Action Button ────────────────────────────────────────────────────────────

export function ActionButton({
  children,
  variant = "secondary",
  className,
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium px-3.5 py-2 rounded-lg transition-all border",
        variant === "primary" &&
          "bg-amber-500 hover:bg-amber-400 text-canvas border-amber-500 hover:border-amber-400",
        variant === "secondary" &&
          "bg-canvas-tertiary hover:bg-canvas-elevated text-text-primary border-border hover:border-border-strong",
        variant === "ghost" &&
          "bg-transparent hover:bg-canvas-tertiary text-text-secondary hover:text-text-primary border-transparent",
        className
      )}
    >
      {children}
    </button>
  );
}
