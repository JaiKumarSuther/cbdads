import { consentRecords } from "@/lib/data";
import {
  Card, SectionHeader, StatusBadge, PageWrapper,
  ActionButton, Badge, Table
} from "@/components/ui";
import { Plus, Search, Filter, Download, ShieldCheck, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const typeAccent: Record<string, string> = {
  "Data Processing Agreement": "cyan",
  "Trademark License": "amber",
  "Trust Agreement": "violet",
  "Compliance Obligation": "emerald",
};

export default function ConsentPage() {
  const active = consentRecords.filter(r => r.status === "active").length;
  const expiring = consentRecords.filter(r => r.status === "expiring").length;
  const draft = consentRecords.filter(r => r.status === "draft").length;
  const review = consentRecords.filter(r => r.status === "under-review").length;

  return (
    <PageWrapper>
      <SectionHeader
        label="Consent & Trust"
        title="Consent Governance"
        description="Manage consent windows, trust agreements, and licensing records with full traceability."
      >
        <ActionButton variant="secondary"><Filter size={13} />Filter</ActionButton>
        <ActionButton variant="secondary"><Download size={13} />Export</ActionButton>
        <ActionButton variant="primary"><Plus size={13} />New Consent</ActionButton>
      </SectionHeader>

      {/* Summary strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active", count: active, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          { label: "Expiring Soon", count: expiring, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
          { label: "Under Review", count: review, icon: ShieldCheck, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
          { label: "Draft", count: draft, icon: AlertTriangle, color: "text-text-tertiary", bg: "bg-canvas-tertiary border-border" },
        ].map((s) => (
          <div key={s.label} className={cn("rounded-xl p-5 border flex items-center gap-4", s.bg)}>
            <div className={cn("shrink-0", s.color)}>
              <s.icon size={20} />
            </div>
            <div>
              <p className="font-display text-2xl font-600 text-text-primary">{s.count}</p>
              <p className="text-[11px] font-mono text-text-secondary uppercase tracking-wide">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search bar */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2.5 bg-canvas-secondary border border-border rounded-lg px-4 py-2.5">
          <Search size={14} className="text-text-tertiary shrink-0" />
          <input
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
            placeholder="Search by subject, ID, type, owner…"
            readOnly
          />
        </div>
        <div className="flex gap-2">
          {["All Types", "Data Processing", "Trademark License", "Trust Agreement"].map((f, i) => (
            <button
              key={f}
              className={cn(
                "text-[12px] font-mono px-3 py-2 rounded-md border transition-colors",
                i === 0
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
                  : "text-text-secondary border-border hover:text-text-primary hover:border-border-strong bg-canvas-secondary"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Main table */}
      <Card>
        <div className="p-5 border-b border-border">
          <h2 className="font-display font-600 text-base text-text-primary">All Consent Records</h2>
          <p className="text-xs text-text-secondary mt-0.5">{consentRecords.length} total records</p>
        </div>
        <div className="p-5">
          <Table headers={["ID / Subject", "Type", "Scope", "Owner", "Granted", "Expires", "Version", "Status"]}>
            {consentRecords.map((rec) => (
              <tr key={rec.id} className="hover:bg-canvas-tertiary/30 transition-colors cursor-pointer group">
                <td className="py-3.5 pr-6">
                  <div>
                    <span className="font-mono text-[10px] text-text-tertiary block">{rec.id}</span>
                    <span className="text-sm font-medium text-text-primary group-hover:text-amber-400 transition-colors">{rec.subject}</span>
                  </div>
                </td>
                <td className="py-3.5 pr-6">
                  <Badge variant={(typeAccent[rec.type] ?? "outline") as "cyan" | "amber" | "violet" | "emerald" | "outline"}>
                    {rec.type}
                  </Badge>
                </td>
                <td className="py-3.5 pr-6">
                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                    {rec.scope.map((s) => (
                      <span key={s} className="text-[10px] font-mono bg-canvas-tertiary text-text-tertiary px-1.5 py-0.5 rounded border border-border">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 pr-6">
                  <span className="text-sm text-text-secondary">{rec.owner}</span>
                </td>
                <td className="py-3.5 pr-6">
                  <span className="font-mono text-[11px] text-text-tertiary">{rec.granted}</span>
                </td>
                <td className="py-3.5 pr-6">
                  <span className={cn(
                    "font-mono text-[11px]",
                    rec.status === "expiring" ? "text-amber-400 font-medium" : "text-text-tertiary"
                  )}>
                    {rec.expires}
                  </span>
                </td>
                <td className="py-3.5 pr-6">
                  <span className="font-mono text-[11px] text-text-tertiary">{rec.version}</span>
                </td>
                <td className="py-3.5">
                  <StatusBadge status={rec.status} />
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </Card>

      {/* Expiring soon callout */}
      <Card className="mt-6 border-amber-500/25 bg-amber-500/5">
        <div className="p-5 flex items-start gap-4">
          <Clock size={18} className="text-amber-400 mt-0.5 shrink-0" />
          <div className="flex-1">
            <h3 className="font-display font-600 text-sm text-amber-400 mb-1">Expiry Watchlist</h3>
            <p className="text-xs text-text-secondary mb-3">
              {expiring} consent record(s) expiring within 30 days. Initiate renewal workflows before expiry to avoid governance gaps.
            </p>
            <div className="flex gap-2">
              {consentRecords.filter(r => r.status === "expiring").map(r => (
                <div key={r.id} className="flex items-center gap-2 bg-canvas-secondary border border-amber-500/20 rounded-lg px-3 py-2">
                  <span className="font-mono text-[10px] text-text-tertiary">{r.id}</span>
                  <span className="text-xs text-text-primary font-medium">{r.subject}</span>
                  <span className="font-mono text-[11px] text-amber-400">→ {r.expires}</span>
                </div>
              ))}
            </div>
          </div>
          <ActionButton variant="primary">
            <Clock size={13} /> Initiate Renewal
          </ActionButton>
        </div>
      </Card>
    </PageWrapper>
  );
}
