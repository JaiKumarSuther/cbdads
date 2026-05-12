"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShieldCheck,
  FileText,
  BookOpen,
  Zap,
  Users,
  ChevronRight,
} from "lucide-react";

const navItems = [
  {
    group: "Core",
    items: [
      { href: "/", label: "Command", icon: LayoutDashboard, badge: null },
      { href: "/consent", label: "Consent & Trust", icon: ShieldCheck, badge: "41" },
      { href: "/trademark", label: "Trademark", icon: FileText, badge: null },
    ],
  },
  {
    group: "Operations",
    items: [
      { href: "/operations", label: "Operations", icon: Zap, badge: "7" },
      { href: "/codex", label: "Codex Ledger", icon: BookOpen, badge: null },
    ],
  },
  {
    group: "Admin",
    items: [
      { href: "/admin", label: "Users & Roles", icon: Users, badge: null },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 flex flex-col bg-canvas-secondary border-r border-border h-full">
      {/* Logo */}
      <div className="h-14 flex items-center px-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
          </div>
          <span className="font-display font-600 text-[15px] tracking-tight text-text-primary">
            CBDADS
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-5 overflow-y-auto">
        {navItems.map((group) => (
          <div key={group.group}>
            <p className="px-2 mb-1.5 text-[10px] font-mono font-500 uppercase tracking-widest text-text-tertiary">
              {group.group}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-2.5 py-2 rounded-md text-sm transition-all duration-150 group",
                        active
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "text-text-secondary hover:text-text-primary hover:bg-canvas-tertiary border border-transparent"
                      )}
                    >
                      <item.icon
                        size={15}
                        className={cn(
                          "shrink-0 transition-colors",
                          active ? "text-amber-400" : "text-text-tertiary group-hover:text-text-secondary"
                        )}
                      />
                      <span className="flex-1 font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] font-mono bg-rose-500/20 text-rose-400 border border-rose-500/30 px-1.5 py-0.5 rounded">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom user card */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-canvas-tertiary transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[11px] font-mono font-500 text-amber-400">
            SO
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-text-primary truncate">Sarah Okonkwo</p>
            <p className="text-[10px] text-text-tertiary truncate">Trust Admin</p>
          </div>
          <ChevronRight size={12} className="text-text-tertiary" />
        </div>
      </div>
    </aside>
  );
}
