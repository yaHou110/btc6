'use client';

import React from 'react';
import { BTC6Provider, useBTC6 } from '@/context/BTC6Context';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { MobileNav } from '@/components/MobileNav';
import { DepositModal } from '@/components/DepositModal';
import { PlayView } from '@/components/views/PlayView';
import { DashboardView } from '@/components/views/DashboardView';
import { TicketsView } from '@/components/views/TicketsView';
import { WalletView } from '@/components/views/WalletView';
import { RulesView } from '@/components/views/RulesView';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

function MainShell() {
  const { currentTab, activeToast } = useBTC6();

  return (
    <div className="relative min-h-screen bg-[#10131a] text-[#e1e2eb] font-sans overflow-x-hidden selection:bg-[#00f2fe] selection:text-[#002022]">
      {/* Background Subtle Cyber Matrix Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="relative pt-20 lg:pt-22 pb-24 lg:pb-12 px-3 sm:px-6 lg:pl-80 transition-all duration-300">
        {currentTab === 'play' && <PlayView />}
        {currentTab === 'dashboard' && <DashboardView />}
        {currentTab === 'tickets' && <TicketsView />}
        {currentTab === 'wallet' && <WalletView />}
        {currentTab === 'rules' && <RulesView />}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Quick Deposit Modal */}
      <DepositModal />

      {/* Interactive Global Toast Notification */}
      {activeToast && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3 bg-[#0b0e14] border border-[#00f2fe]/40 text-white px-4 py-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] cyan-glow animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-sm">
          {activeToast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#00e475] shrink-0" />
          ) : activeToast.type === 'warn' ? (
            <AlertTriangle className="w-5 h-5 text-[#f7931a] shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-[#00f2fe] shrink-0" />
          )}

          <div className="flex flex-col min-w-0">
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-white">
              {activeToast.title}
            </span>
            <span className="font-mono text-[11px] text-[#b9cacb] truncate">
              {activeToast.message}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <BTC6Provider>
      <MainShell />
    </BTC6Provider>
  );
}
