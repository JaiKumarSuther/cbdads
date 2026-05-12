import { dashboardStats, alerts, operationsTasks, weeklyActivity } from "@/lib/data";
import {
  StatCard, Card, SectionHeader, StatusBadge, PriorityBadge,
  PageWrapper, ActionButton, Badge, Table
} from "@/components/ui";
import { AlertTriangle, ArrowRight, Plus, Download, Filter, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const severityStyles: Record<string, string> = {
  critical: "border-l-rose-500 bg-rose-500/5",
  high:     "border-l-amber-500 bg-amber-500/5",
  medium:   "border-l-cyan-500 bg-cyan-500/5",
  low:      "border-l-border bg-canvas-tertiary/30",
};
const severityBadge: Record<string, "rose" | "amber" | "cyan" | "ghost"> = {
  critical: "rose", high: "amber", medium: "cyan", low: "ghost",
};
const maxActivity = Math.max(...weeklyActivity.map((d) => d.actions));

export default function DashboardPage() {
  const openAlerts = alerts.filter((a) => a.status === "open" || a.status === "reviewing");
  return (
    <PageWrapper>
      <SectionHeader label="Command Center" title="Governance Overview" description="Real-time operational and compliance status across all governed workflows.">
        <ActionButton variant="secondary"><Filter size={13} />Filter</ActionButton>
        <ActionButton variant="secondary"><Download size={13} />Export</ActionButton>
        <ActionButton variant="primary"><Plus size={13} />New Record</ActionButton>
      </SectionHeader>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {dashboardStats.map((stat, i) => (
          <StatCard key={stat.id} label={stat.label} value={stat.value} change={stat.change} trend={stat.trend as "up" | "down"} accent={stat.accent} className={cn("animate-slide-up", `stagger-${i + 1}`)} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <Card className="xl:col-span-2">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="font-display font-600 text-base text-text-primary">Active Alerts</h2>
              <p className="text-xs text-text-secondary mt-0.5">{openAlerts.length} requiring attention</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="rose">{openAlerts.filter(a => a.severity === "critical").length} critical</Badge>
              <Link href="/operations"><ActionButton variant="ghost">View all <ArrowRight size={12} /></ActionButton></Link>
            </div>
          </div>
          <div className="divide-y divide-border/50">
            {openAlerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className={cn("p-4 border-l-2 hover:bg-canvas-tertiary/30 transition-colors cursor-pointer", severityStyles[alert.severity])}>
                <div className="flex items-start gap-3">
                  <AlertTriangle size={14} className={cn("mt-0.5 shrink-0", alert.severity === "critical" ? "text-rose-400" : alert.severity === "high" ? "text-amber-400" : alert.severity === "medium" ? "text-cyan-400" : "text-text-tertiary")} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[11px] text-text-tertiary">{alert.id}</span>
                      <Badge variant={severityBadge[alert.severity]}>{alert.severity}</Badge>
                      <Badge variant="outline">{alert.module}</Badge>
                    </div>
                    <p className="text-sm font-medium text-text-primary mt-1">{alert.title}</p>
                    <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">{alert.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[11px] text-text-tertiary">→ {alert.assignee}</span>
                      <span className="text-[11px] text-text-tertiary">{alert.time}</span>
                    </div>
                  </div>
                  <StatusBadge status={alert.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="p-5 border-b border-border">
            <h2 className="font-display font-600 text-base text-text-primary">Weekly Activity</h2>
            <p className="text-xs text-text-secondary mt-0.5">Actions vs. resolved (7 days)</p>
          </div>
          <div className="p-5">
            <div className="flex items-end justify-between gap-2 mb-3">
              {weeklyActivity.map((d) => {
                const actionH = (d.actions / maxActivity) * 100;
                const resolvedH = (d.resolved / maxActivity) * 100;
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex items-end gap-0.5 h-28">
                      <div className="flex-1 bg-amber-500/30 rounded-t-sm hover:bg-amber-500/50 transition-colors" style={{ height: `${actionH}%` }} />
                      <div className="flex-1 bg-emerald-500/40 rounded-t-sm hover:bg-emerald-500/60 transition-colors" style={{ height: `${resolvedH}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-text-tertiary">{d.day}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 pt-3 border-t border-border">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-amber-500/50" /><span className="text-[11px] text-text-secondary">Actions</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-emerald-500/50" /><span className="text-[11px] text-text-secondary">Resolved</span></div>
            </div>
          </div>
          <div className="px-5 pb-5 grid grid-cols-2 gap-3">
            {[
              { label: "Avg. Resolution", value: "4.2h", accent: "text-cyan-400" },
              { label: "Compliance Rate", value: "97.3%", accent: "text-emerald-400" },
              { label: "Drift Events", value: "7", accent: "text-rose-400" },
              { label: "Pending Promos", value: "41", accent: "text-amber-400" },
            ].map((m) => (
              <div key={m.label} className="bg-canvas-tertiary rounded-lg p-3">
                <p className="text-[10px] font-mono text-text-tertiary uppercase tracking-wide mb-1">{m.label}</p>
                <p className={cn("font-display font-600 text-lg", m.accent)}>{m.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mb-6">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-display font-600 text-base text-text-primary">Operations Queue</h2>
            <p className="text-xs text-text-secondary mt-0.5">Highest-priority open tasks</p>
          </div>
          <Link href="/operations"><ActionButton variant="ghost">Full queue <ArrowRight size={12} /></ActionButton></Link>
        </div>
        <div className="p-5">
          <Table headers={["Task", "Module", "Priority", "Assignee", "Due", "Status"]}>
            {operationsTasks.filter(t => t.status !== "done").slice(0, 5).map((task) => (
              <tr key={task.id} className="hover:bg-canvas-tertiary/30 transition-colors cursor-pointer">
                <td className="py-3 pr-6">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-text-tertiary">{task.id}</span>
                    <span className="text-sm text-text-primary font-medium">{task.title}</span>
                  </div>
                </td>
                <td className="py-3 pr-6"><Badge variant="outline">{task.module}</Badge></td>
                <td className="py-3 pr-6"><PriorityBadge priority={task.priority} /></td>
                <td className="py-3 pr-6"><span className="text-sm text-text-secondary">{task.assignee}</span></td>
                <td className="py-3 pr-6"><span className="font-mono text-[11px] text-text-tertiary">{task.due}</span></td>
                <td className="py-3"><StatusBadge status={task.status} /></td>
              </tr>
            ))}
          </Table>
        </div>
      </Card>

      <Card>
        <div className="p-5 border-b border-border">
          <h2 className="font-display font-600 text-base text-text-primary">Compliance Health</h2>
          <p className="text-xs text-text-secondary mt-0.5">Module-level governance alignment scores</p>
        </div>
        <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { module: "Consent & Trust", score: 98, trend: "+1.2" },
            { module: "Trademark", score: 82, trend: "-3.4" },
            { module: "Operations", score: 95, trend: "+0.8" },
            { module: "Admin", score: 100, trend: "0.0" },
          ].map((m) => (
            <div key={m.module} className="bg-canvas-tertiary rounded-lg p-4">
              <p className="text-[10px] font-mono text-text-tertiary uppercase tracking-wide mb-3">{m.module}</p>
              <div className="flex items-end justify-between mb-2">
                <span className={cn("font-display text-2xl font-600", m.score >= 95 ? "text-emerald-400" : m.score >= 80 ? "text-amber-400" : "text-rose-400")}>{m.score}%</span>
                <div className="flex items-center gap-1"><TrendingUp size={10} className="text-emerald-400" /><span className="text-[10px] font-mono text-text-tertiary">{m.trend}</span></div>
              </div>
              <div className="w-full h-1.5 bg-canvas-elevated rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full", m.score >= 95 ? "bg-emerald-500" : m.score >= 80 ? "bg-amber-500" : "bg-rose-500")} style={{ width: `${m.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageWrapper>
  );
}
