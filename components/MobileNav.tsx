'use client';

import React from 'react';
import { useBTC6 } from '@/context/BTC6Context';
import {
  Gamepad2,
  LayoutGrid,
  Ticket,
  Wallet,
  ShieldCheck,
} from 'lucide-react';

export function MobileNav() {
  const { currentTab, setCurrentTab, tickets } = useBTC6();
  const activeTicketsCount = tickets.filter((t) => t.status === 'ACTIVE').length;

  const tabs = [
    { id: 'play' as const, label: 'Play', icon: Gamepad2 },
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutGrid },
    { id: 'tickets' as const, label: 'Tickets', icon: Ticket, badge: activeTicketsCount },
    { id: 'wallet' as const, label: 'Wallet', icon: Wallet },
    { id: 'rules' as const, label: 'Rules', icon: ShieldCheck },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#0b0e14]/95 backdrop-blur-xl border-t border-[#1e293b] z-50 lg:hidden flex items-center justify-around px-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`relative flex flex-col items-center justify-center min-w-[56px] h-12 gap-0.5 transition-colors ${
              isActive ? 'text-[#00f2fe]' : 'text-[#849495] hover:text-white'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1 -right-2 px-1 min-w-[14px] h-3.5 flex items-center justify-center rounded-full bg-[#f7931a] text-[#002022] font-mono text-[8px] font-bold">
                  {tab.badge}
                </span>
              )}
            </div>

            <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">
              {tab.label}
            </span>

            {/* Active bottom cyan indicator dot */}
            {isActive && (
              <span className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-[#00f2fe] shadow-[0_0_6px_#00f2fe]" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
