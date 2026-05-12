import type { Metadata } from "next";
import "../globals.css";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export const metadata: Metadata = {
  title: "CBDADS — Governance Platform",
  description: "Consent, Compliance, and Governance Command Environment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-canvas text-text-primary font-sans antialiased">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto grid-bg">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
