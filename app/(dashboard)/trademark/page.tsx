import { trademarkRecords } from "@/lib/data";
import { Card, SectionHeader, StatusBadge, PageWrapper, ActionButton, Badge } from "@/components/ui";
import { FileText, Plus, Filter, AlertTriangle, Globe, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TrademarkPage() {
  const driftFlagged = trademarkRecords.filter(r => r.status === "drift-flagged");
  const active = trademarkRecords.filter(r => r.status === "active");

  return (
    <PageWrapper>
      <SectionHeader
        label="Trademark"
        title="Trademark & Identity Registry"
        description="Govern trademark licenses, identity anchors, and jurisdictional records with drift detection."
      >
        <ActionButton variant="secondary"><Filter size={13} />Filter</ActionButton>
        <ActionButton variant="primary"><Plus size={13} />New Trademark</ActionButton>
      </SectionHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Marks", value: trademarkRecords.length, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
          { label: "Active", value: active.length, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          { label: "Drift Flagged", value: driftFlagged.length, color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
          { label: "Draft", value: trademarkRecords.filter(r => r.status === "draft").length, color: "text-text-tertiary", bg: "bg-canvas-tertiary border-border" },
        ].map((s) => (
          <div key={s.label} className={cn("rounded-xl p-5 border", s.bg)}>
            <p className={cn("font-display text-3xl font-600", s.color)}>{s.value}</p>
            <p className="text-[11px] font-mono text-text-secondary uppercase tracking-wide mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Drift alert banner */}
      {driftFlagged.length > 0 && (
        <div className="mb-6 bg-rose-500/8 border border-rose-500/25 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle size={16} className="text-rose-400 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-rose-400 mb-0.5">Identity Drift Detected</p>
            <p className="text-xs text-text-secondary">
              {driftFlagged.length} trademark record(s) have identity anchor mismatches. Remediation workflows have been triggered. Trust Admin review required.
            </p>
          </div>
          <ActionButton variant="secondary">Remediate Now</ActionButton>
        </div>
      )}

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {trademarkRecords.map((tm) => (
          <Card
            key={tm.id}
            className={cn(
              "hover:border-border-strong transition-all cursor-pointer group",
              tm.status === "drift-flagged" && "border-rose-500/30 bg-rose-500/5"
            )}
          >
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[10px] text-text-tertiary">{tm.id}</span>
                    <StatusBadge status={tm.status} />
                  </div>
                  <h3 className="font-display text-lg font-600 text-text-primary group-hover:text-amber-400 transition-colors">
                    {tm.name}
                  </h3>
                  <p className="text-xs text-text-secondary mt-0.5">{tm.class}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-canvas-tertiary border border-border flex items-center justify-center shrink-0">
                  <FileText size={16} className="text-text-tertiary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-text-secondary">
                  <Globe size={11} className="text-text-tertiary shrink-0" />
                  <span>{tm.jurisdiction}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <User size={11} className="text-text-tertiary shrink-0" />
                  <span>{tm.owner}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Calendar size={11} className="text-text-tertiary shrink-0" />
                  <span>Reg: <span className="font-mono text-[10px]">{tm.registered}</span></span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Calendar size={11} className="text-text-tertiary shrink-0" />
                  <span>Exp: <span className="font-mono text-[10px]">{tm.expires}</span></span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-text-tertiary">Licensee:</span>
                  <span className="text-xs font-medium text-text-primary">{tm.licensee}</span>
                </div>
                {tm.status === "drift-flagged" && (
                  <Badge variant="rose">
                    <AlertTriangle size={9} /> Drift Alert
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}
