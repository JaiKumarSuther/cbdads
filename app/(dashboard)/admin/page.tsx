import { users } from "@/lib/data";
import {
  Card, SectionHeader, StatusBadge, PageWrapper,
  ActionButton, Badge, Avatar
} from "@/components/ui";
import { Users, Plus, Shield, Eye, Wrench, ShieldCheck, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const roleIcon: Record<string, React.ElementType> = {
  "Trust Admin": Shield,
  "Ops Admin": Wrench,
  "Compliance Officer": ShieldCheck,
  "View-only": Eye,
};

const roleAccent: Record<string, string> = {
  "Trust Admin": "text-amber-400",
  "Ops Admin": "text-cyan-400",
  "Compliance Officer": "text-emerald-400",
  "View-only": "text-violet-400",
};

const roleDesc: Record<string, string> = {
  "Trust Admin": "Full governance access. Manages consent, identity, and high-risk approvals.",
  "Ops Admin": "Day-to-day task execution, alert handling, and workflow orchestration.",
  "Compliance Officer": "Monitors obligations, reviews exceptions, validates governance alignment.",
  "View-only": "Read-only visibility for auditors, executives, and external reviewers.",
};

export default function AdminPage() {
  const roleSummary = ["Trust Admin", "Ops Admin", "Compliance Officer", "View-only"].map(role => ({
    role,
    count: users.filter(u => u.role === role).length,
  }));

  return (
    <PageWrapper>
      <SectionHeader
        label="Admin"
        title="Users & Role Management"
        description="Manage platform access, role assignments, and account governance controls."
      >
        <ActionButton variant="secondary">Audit Log</ActionButton>
        <ActionButton variant="primary"><Plus size={13} />Invite User</ActionButton>
      </SectionHeader>

      {/* Role overview cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {roleSummary.map((r) => {
          const Icon = roleIcon[r.role] ?? Users;
          return (
            <div key={r.role} className="bg-canvas-secondary border border-border rounded-xl p-5 hover:border-border-strong transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <Icon size={15} className={cn("transition-colors", roleAccent[r.role])} />
                <span className={cn("font-display text-2xl font-600", roleAccent[r.role])}>{r.count}</span>
              </div>
              <p className="text-xs font-medium text-text-primary">{r.role}</p>
              <p className="text-[10px] text-text-tertiary mt-1 leading-relaxed line-clamp-2">{roleDesc[r.role]}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* User table */}
        <Card className="xl:col-span-2">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="font-display font-600 text-base text-text-primary">Platform Users</h2>
              <p className="text-xs text-text-secondary mt-0.5">{users.length} accounts</p>
            </div>
            <div className="flex gap-1.5">
              {["All", "Active", "Restricted"].map((f, i) => (
                <button key={f} className={cn("text-[11px] font-mono px-2.5 py-1 rounded border transition-colors",
                  i === 0 ? "bg-amber-500/10 text-amber-400 border-amber-500/25" : "text-text-tertiary border-transparent hover:border-border"
                )}>{f}</button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-border/50">
            {users.map((user) => {
              const Icon = roleIcon[user.role] ?? Users;
              return (
                <div key={user.id} className="p-4 flex items-center gap-4 hover:bg-canvas-tertiary/20 transition-colors cursor-pointer group">
                  <Avatar initials={user.avatar} color={user.color} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-text-primary group-hover:text-amber-400 transition-colors">
                        {user.name}
                      </span>
                      <StatusBadge status={user.status} />
                    </div>
                    <p className="text-xs text-text-tertiary mt-0.5 font-mono">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Icon size={11} className={roleAccent[user.role]} />
                    <span className={cn("text-xs font-medium", roleAccent[user.role])}>{user.role}</span>
                  </div>
                  <div className="text-right shrink-0 hidden md:block">
                    <p className="font-mono text-[10px] text-text-tertiary">Last login</p>
                    <p className="font-mono text-[10px] text-text-secondary">{user.lastLogin}</p>
                  </div>
                  <div className="text-right shrink-0 hidden lg:block">
                    <p className="font-mono text-[10px] text-text-tertiary">Actions/30d</p>
                    <p className="font-display text-sm font-600 text-text-primary">{user.actions30d}</p>
                  </div>
                  <ChevronRight size={13} className="text-text-tertiary shrink-0 ml-1" />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right panel */}
        <div className="flex flex-col gap-5">
          {/* Role matrix */}
          <Card>
            <div className="p-5 border-b border-border">
              <h2 className="font-display font-600 text-base text-text-primary">Permission Matrix</h2>
              <p className="text-xs text-text-secondary mt-0.5">What each role can do</p>
            </div>
            <div className="p-5">
              <div className="space-y-1">
                {/* Header */}
                <div className="grid grid-cols-5 gap-1 mb-2">
                  <span className="text-[9px] font-mono text-text-tertiary uppercase col-span-2">Permission</span>
                  {["Trust", "Ops", "Comp.", "View"].map(r => (
                    <span key={r} className="text-[9px] font-mono text-text-tertiary uppercase text-center">{r}</span>
                  ))}
                </div>
                {[
                  { perm: "Read Records", t: true, o: true, c: true, v: true },
                  { perm: "Intake/Draft", t: true, o: true, c: false, v: false },
                  { perm: "Promote Record", t: true, o: false, c: false, v: false },
                  { perm: "Resolve Alerts", t: true, o: true, c: false, v: false },
                  { perm: "Review Exceptions", t: true, o: false, c: true, v: false },
                  { perm: "Manage Roles", t: true, o: false, c: false, v: false },
                  { perm: "Export Codex", t: true, o: true, c: true, v: false },
                ].map((row) => (
                  <div key={row.perm} className="grid grid-cols-5 gap-1 py-1.5 border-t border-border/40">
                    <span className="text-[11px] text-text-secondary col-span-2">{row.perm}</span>
                    {[row.t, row.o, row.c, row.v].map((allowed, i) => (
                      <div key={i} className="flex justify-center">
                        <span className={cn(
                          "w-4 h-4 rounded flex items-center justify-center text-[10px]",
                          allowed ? "bg-emerald-500/20 text-emerald-400" : "bg-canvas-tertiary text-text-tertiary"
                        )}>
                          {allowed ? "✓" : "–"}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Pending requests */}
          <Card>
            <div className="p-5 border-b border-border">
              <h2 className="font-display font-600 text-base text-text-primary">Pending Requests</h2>
            </div>
            <div className="p-5 space-y-3">
              {[
                { user: "D. Farouk", from: "Ops Admin", to: "Trust Admin", time: "3h ago" },
              ].map((r) => (
                <div key={r.user} className="bg-canvas-tertiary rounded-lg p-3 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar initials="DF" color="rose" size="sm" />
                    <div>
                      <p className="text-xs font-medium text-text-primary">{r.user}</p>
                      <p className="text-[10px] text-text-tertiary">{r.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="cyan">{r.from}</Badge>
                    <span className="text-[10px] text-text-tertiary">→</span>
                    <Badge variant="amber">{r.to}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 text-[11px] font-mono py-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20 transition-colors">
                      Approve
                    </button>
                    <button className="flex-1 text-[11px] font-mono py-1.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/25 hover:bg-rose-500/20 transition-colors">
                      Deny
                    </button>
                  </div>
                </div>
              ))}
              {[{ user: "New Reviewer", email: "r.new@ext.org", role: "View-only" }].map(r => (
                <div key={r.user} className="bg-canvas-tertiary rounded-lg p-3 border border-border">
                  <p className="text-xs font-medium text-text-primary mb-0.5">{r.user}</p>
                  <p className="text-[10px] text-text-tertiary font-mono mb-2">{r.email}</p>
                  <Badge variant="violet">{r.role}</Badge>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 text-[11px] font-mono py-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20 transition-colors">Approve</button>
                    <button className="flex-1 text-[11px] font-mono py-1.5 rounded bg-canvas-elevated text-text-secondary border border-border hover:text-text-primary transition-colors">Deny</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
