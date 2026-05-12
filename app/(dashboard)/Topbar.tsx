"use client";

import { Bell, Search, RefreshCw } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-14 shrink-0 flex items-center gap-4 px-6 bg-canvas-secondary/80 backdrop-blur border-b border-border">
      {/* Search */}
      <div className="flex-1 max-w-sm">
        <div className="flex items-center gap-2.5 bg-canvas-tertiary border border-border rounded-md px-3 py-1.5 text-sm text-text-tertiary hover:border-border-strong transition-colors cursor-text">
          <Search size={13} />
          <span className="text-[13px]">Search records, actions, actors…</span>
          <kbd className="ml-auto text-[10px] font-mono bg-canvas border border-border px-1.5 py-0.5 rounded text-text-tertiary">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Live indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-pulse" />
          <span className="text-[11px] font-mono text-emerald-400">LIVE</span>
        </div>

        {/* Refresh */}
        <button className="w-8 h-8 flex items-center justify-center rounded-md text-text-tertiary hover:text-text-secondary hover:bg-canvas-tertiary border border-transparent hover:border-border transition-all">
          <RefreshCw size={13} />
        </button>

        {/* Alerts */}
        <button className="relative w-8 h-8 flex items-center justify-center rounded-md text-text-tertiary hover:text-text-secondary hover:bg-canvas-tertiary border border-transparent hover:border-border transition-all">
          <Bell size={13} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-500" />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-border mx-1" />

        {/* Date */}
        <span className="text-[11px] font-mono text-text-tertiary whitespace-nowrap">
          2026-05-11 · 09:42 UTC
        </span>
      </div>
    </header>
  );
}
