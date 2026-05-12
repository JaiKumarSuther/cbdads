import { alerts, operationsTasks } from "@/lib/data";
import {
  Card, SectionHeader, StatusBadge, PriorityBadge,
  PageWrapper, ActionButton, Badge
} from "@/components/ui";
import { AlertTriangle, CheckCircle2, Zap, Link2, Plus, Filter, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

const severityLeft: Record<string, string> = {
  critical: "border-l-rose-500",
  high: "border-l-amber-500",
  medium: "border-l-cyan-500",
  low: "border-l-border",
};

const severityIcon: Record<string, string> = {
  critical: "text-rose-400",
  high: "text-amber-400",
  medium: "text-cyan-400",
  low: "text-text-tertiary",
};

const priorityLeft: Record<string, string> = {
  urgent: "border-l-rose-400",
  high: "border-l-amber-400",
  medium: "border-l-cyan-400",
  low: "border-l-border",
};

export default function OperationsPage() {
  const criticalAlerts = alerts.filter(a => a.severity === "critical");
  const openTasks = operationsTasks.filter(t => t.status !== "done");
  const doneTasks = operationsTasks.filter(t => t.status === "done");

  return (
    <PageWrapper>
      <SectionHeader
        label="Operations"
        title="Operations Command"
        description="Manage alerts, task queue, escalation routing, and workflow execution."
      >
        <ActionButton variant="secondary"><Filter size={13} />Filter</ActionButton>
        <ActionButton variant="primary"><Plus size={13} />New Task</ActionButton>
      </SectionHeader>

      {/* Top-level counts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Critical Alerts", value: criticalAlerts.length, color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
          { label: "Open Tasks", value: openTasks.length, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
          { label: "In Progress", value: operationsTasks.filter(t => t.status === "in-progress").length, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
          { label: "Resolved Today", value: doneTasks.length, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
        ].map((s) => (
          <div key={s.label} className={cn("rounded-xl p-5 border", s.bg)}>
            <p className={cn("font-display text-3xl font-600", s.color)}>{s.value}</p>
            <p className="text-[11px] font-mono text-text-secondary uppercase tracking-wide mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Alert feed */}
        <Card>
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="font-display font-600 text-base text-text-primary">Alert Feed</h2>
              <p className="text-xs text-text-secondary mt-0.5">{alerts.length} total — {criticalAlerts.length} critical</p>
            </div>
            <div className="flex gap-1.5">
              {["All", "Open", "Reviewing", "Resolved"].map((f, i) => (
                <button key={f} className={cn("text-[11px] font-mono px-2.5 py-1 rounded border transition-colors",
                  i === 0 ? "bg-amber-500/10 text-amber-400 border-amber-500/25" : "text-text-tertiary border-transparent hover:border-border hover:text-text-secondary"
                )}>{f}</button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-border/50 max-h-[600px] overflow-y-auto">
            {alerts.map((alert) => (
              <div key={alert.id} className={cn("p-4 border-l-2 hover:bg-canvas-tertiary/20 transition-colors cursor-pointer", severityLeft[alert.severity])}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <AlertTriangle size={13} className={cn("mt-0.5 shrink-0", severityIcon[alert.severity])} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                        <span className="font-mono text-[10px] text-text-tertiary">{alert.id}</span>
                        <Badge variant={alert.severity === "critical" ? "rose" : alert.severity === "high" ? "amber" : alert.severity === "medium" ? "cyan" : "ghost"}>
                          {alert.severity}
                        </Badge>
                        <Badge variant="outline">{alert.module}</Badge>
                      </div>
                      <p className="text-sm font-medium text-text-primary">{alert.title}</p>
                      <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{alert.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[11px] text-text-tertiary">
                          → {alert.assignee}
                        </span>
                        <span className="text-[11px] text-text-tertiary">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={alert.status} />
                </div>
                {alert.status === "open" && (
                  <div className="flex gap-2 mt-3 ml-[22px]">
                    <button className="text-[11px] font-mono px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">
                      Assign
                    </button>
                    <button className="text-[11px] font-mono px-2.5 py-1 rounded bg-canvas-tertiary text-text-secondary border border-border hover:text-text-primary transition-colors">
                      Acknowledge
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Task queue */}
        <Card>
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="font-display font-600 text-base text-text-primary">Task Queue</h2>
              <p className="text-xs text-text-secondary mt-0.5">{openTasks.length} open, {doneTasks.length} done</p>
            </div>
            <ActionButton variant="primary"><Plus size={12} />Task</ActionButton>
          </div>
          <div className="divide-y divide-border/50 max-h-[600px] overflow-y-auto">
            {operationsTasks.map((task) => (
              <div key={task.id} className={cn(
                "p-4 border-l-2 hover:bg-canvas-tertiary/20 transition-colors cursor-pointer",
                task.status === "done" ? "opacity-50" : "",
                priorityLeft[task.priority]
              )}>
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0",
                    task.status === "done" ? "bg-emerald-500/30 border-emerald-500" : "border-border"
                  )}>
                    {task.status === "done" && <CheckCircle2 size={10} className="text-emerald-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      <span className="font-mono text-[10px] text-text-tertiary">{task.id}</span>
                      <PriorityBadge priority={task.priority} />
                      <Badge variant="outline">{task.module}</Badge>
                      {task.linkedAlert && (
                        <span className="flex items-center gap-0.5 text-[10px] font-mono text-text-tertiary">
                          <Link2 size={9} /> {task.linkedAlert}
                        </span>
                      )}
                    </div>
                    <p className={cn("text-sm font-medium", task.status === "done" ? "text-text-tertiary line-through" : "text-text-primary")}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[11px] text-text-tertiary">→ {task.assignee}</span>
                      <span className={cn("font-mono text-[11px]", new Date(task.due) < new Date("2026-05-12") && task.status !== "done" ? "text-rose-400 font-medium" : "text-text-tertiary")}>
                        Due {task.due}
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={task.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Workflow diagram strip */}
      <Card className="mt-6">
        <div className="p-5 border-b border-border">
          <h2 className="font-display font-600 text-base text-text-primary">Record Lifecycle</h2>
          <p className="text-xs text-text-secondary mt-0.5">Standard governed workflow — intake to codex</p>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-0 overflow-x-auto">
            {[
              { step: "01", label: "Intake", sub: "Draft submitted", icon: ClipboardList, color: "text-text-secondary", bg: "bg-canvas-tertiary border-border" },
              { step: "02", label: "Role Review", sub: "Routed to owner", icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
              { step: "03", label: "Approval", sub: "Trust admin signs", icon: CheckCircle2, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
              { step: "04", label: "Promoted", sub: "Official record", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
              { step: "05", label: "Codex Entry", sub: "Permanent log", icon: ClipboardList, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
            ].map((s, i) => (
              <div key={s.step} className="flex items-center shrink-0">
                <div className={cn("flex flex-col items-center rounded-xl border px-5 py-4 min-w-[120px]", s.bg)}>
                  <span className="font-mono text-[10px] text-text-tertiary mb-2">{s.step}</span>
                  <s.icon size={16} className={s.color} />
                  <span className="text-xs font-medium text-text-primary mt-2">{s.label}</span>
                  <span className="text-[10px] text-text-tertiary mt-0.5">{s.sub}</span>
                </div>
                {i < 4 && (
                  <div className="flex items-center px-2">
                    <div className="w-6 h-px bg-border" />
                    <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-transparent border-l-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
}
