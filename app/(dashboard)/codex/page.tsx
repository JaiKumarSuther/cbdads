import { codexEntries } from "@/lib/data";
import {
  Card, SectionHeader, StatusBadge, PageWrapper,
  ActionButton, Badge
} from "@/components/ui";
import { BookOpen, Download, Filter, Hash, Shield, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const actionStyles: Record<string, { badge: "rose" | "amber" | "cyan" | "emerald" | "violet" | "ghost" | "outline"; label: string }> = {
  RECORD_PROMOTED:     { badge: "emerald", label: "Record Promoted" },
  DRIFT_DETECTED:      { badge: "rose",    label: "Drift Detected" },
  TASK_RESOLVED:       { badge: "emerald", label: "Task Resolved" },
  EXCEPTION_REVIEWED:  { badge: "cyan",    label: "Exception Reviewed" },
  PROMOTION_BLOCKED:   { badge: "rose",    label: "Promotion Blocked" },
  ROLE_UPDATED:        { badge: "amber",   label: "Role Updated" },
  CONSENT_EXPIRY_ALERT:{ badge: "amber",   label: "Expiry Alert" },
  RECORD_INTAKE:       { badge: "violet",  label: "Record Intake" },
};

export default function CodexPage() {
  return (
    <PageWrapper>
      <SectionHeader
        label="Codex Ledger"
        title="Immutable Audit Ledger"
        description="Permanent, tamper-evident record of every governed action, actor, and outcome across the platform."
      >
        <ActionButton variant="secondary"><Filter size={13} />Filter</ActionButton>
        <ActionButton variant="secondary"><Download size={13} />Export Ledger</ActionButton>
      </SectionHeader>

      {/* Integrity strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: Lock,
            title: "Immutable Records",
            desc: "All entries are append-only. No modification or deletion is permitted post-creation.",
            accent: "border-emerald-500/20 bg-emerald-500/5",
            iconColor: "text-emerald-400",
          },
          {
            icon: Hash,
            title: "Hash-Verified",
            desc: "Each entry carries a deterministic hash for integrity verification during audits.",
            accent: "border-cyan-500/20 bg-cyan-500/5",
            iconColor: "text-cyan-400",
          },
          {
            icon: Shield,
            title: "Role-Attributed",
            desc: "Every action is attributed to a named actor with their governance role at time of action.",
            accent: "border-amber-500/20 bg-amber-500/5",
            iconColor: "text-amber-400",
          },
        ].map((s) => (
          <div key={s.title} className={cn("rounded-xl border p-5 flex gap-4 items-start", s.accent)}>
            <s.icon size={18} className={cn("mt-0.5 shrink-0", s.iconColor)} />
            <div>
              <p className="text-sm font-medium text-text-primary mb-1">{s.title}</p>
              <p className="text-xs text-text-secondary leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Ledger stats */}
      <div className="flex items-center gap-6 mb-5 px-1">
        {[
          { label: "Total Entries", value: "8,491" },
          { label: "Today", value: "7" },
          { label: "Flagged Entries", value: "2" },
          { label: "Blocked Actions", value: "1" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="font-display text-lg font-600 text-text-primary">{s.value}</span>
            <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wide">{s.label}</span>
            <span className="w-px h-3 bg-border ml-2" />
          </div>
        ))}
      </div>

      {/* Ledger table */}
      <Card>
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen size={15} className="text-violet-400" />
            <h2 className="font-display font-600 text-base text-text-primary">Ledger Entries</h2>
          </div>
          <div className="flex gap-1.5">
            {["All", "Success", "Flagged", "Blocked"].map((f, i) => (
              <button key={f} className={cn("text-[11px] font-mono px-2.5 py-1 rounded border transition-colors",
                i === 0 ? "bg-amber-500/10 text-amber-400 border-amber-500/25" : "text-text-tertiary border-transparent hover:border-border hover:text-text-secondary"
              )}>{f}</button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-border/40">
          {codexEntries.map((entry, idx) => {
            const action = actionStyles[entry.action] ?? { badge: "outline" as const, label: entry.action };
            return (
              <div
                key={entry.id}
                className="p-4 hover:bg-canvas-tertiary/20 transition-colors group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  {/* Left: index line */}
                  <div className="flex flex-col items-center gap-1 shrink-0 w-4">
                    <span className="font-mono text-[9px] text-text-tertiary">{String(codexEntries.length - idx).padStart(2, "0")}</span>
                    {idx < codexEntries.length - 1 && (
                      <div className="w-px flex-1 bg-border min-h-[20px]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1.5">
                      <span className="font-mono text-[10px] text-text-tertiary">{entry.id}</span>
                      <Badge variant={action.badge}>{action.label}</Badge>
                      <Badge variant="outline">{entry.module}</Badge>
                      <StatusBadge status={entry.outcome} />
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-sm text-text-primary font-medium">
                        {entry.actor}
                        <span className="text-text-tertiary font-normal"> · {entry.role}</span>
                      </span>
                      <span className="text-sm text-text-secondary">
                        acted on <span className="font-mono text-[11px] text-text-primary">{entry.target}</span>
                      </span>
                    </div>

                    {entry.notes && (
                      <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">{entry.notes}</p>
                    )}
                  </div>

                  {/* Right: timestamp + hash */}
                  <div className="shrink-0 text-right hidden md:block">
                    <p className="font-mono text-[10px] text-text-secondary">{entry.timestamp}</p>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <Hash size={9} className="text-text-tertiary" />
                      <span className="font-mono text-[10px] text-text-tertiary">{entry.hash}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-canvas-tertiary/30 rounded-b-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-tertiary font-mono">
              Showing {codexEntries.length} most recent entries · Total: 8,491
            </span>
            <ActionButton variant="ghost">
              Load more <span className="font-mono">↓</span>
            </ActionButton>
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
}
