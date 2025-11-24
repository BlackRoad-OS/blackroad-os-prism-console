import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export const metadata: Metadata = {
  title: "Prism Console - BlackRoad OS",
  description: "Prism console for BlackRoad OS — environments, deployments, observability, admin views.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#05060a] text-zinc-100">
        <div className="flex min-h-screen bg-gradient-to-br from-[#0b0d14] via-[#0a0b12] to-[#05060a]">
          <Sidebar />
          <div className="flex-1 flex flex-col border-l border-[#111827] bg-black/20 backdrop-blur-xl">
            <TopBar />
            <main className="flex-1 p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
