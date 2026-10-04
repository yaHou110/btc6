'use client';

import React from 'react';
import { useBTC6 } from '@/context/BTC6Context';
import { Logo } from '@/components/Logo';
import {
  Gamepad2,
  LayoutGrid,
  Ticket,
  Wallet,
  History,
  ShieldCheck,
  Settings,
  Wifi,
} from 'lucide-react';

export function Sidebar() {
  const { currentTab, setCurrentTab, tickets } = useBTC6();

  const activeTicketsCount = tickets.filter((t) => t.status === 'ACTIVE').length;

  const navItems = [
    {
      id: 'play' as const,
      label: 'Terminal / Play',
      icon: Gamepad2,
      hasPulse: true,
    },
    {
      id: 'dashboard' as const,
      label: 'Dashboard',
      icon: LayoutGrid,
    },
    {
      id: 'tickets' as const,
      label: 'My Tickets',
      icon: Ticket,
      badge: `${activeTicketsCount} Active`,
    },
    {
      id: 'wallet' as const,
      label: 'Wallet',
      icon: Wallet,
    },
    {
      id: 'rules' as const,
      label: 'Rules & Fair',
      icon: ShieldCheck,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-[#0b0e14] border-r border-[#1e293b] z-50 hidden lg:flex flex-col justify-between p-4 shadow-[0_1px_12px_rgba(0,0,0,0.5)]">
      {/* Brand Header & Navigation Area */}
      <div className="flex flex-col gap-6">
        {/* Logo Lockup */}
        <div className="pt-2 px-1">
          <Logo size="md" />
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col gap-1.5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 text-left font-sans text-sm ${
                  isActive
                    ? 'bg-[#191c22] text-[#00f2fe] font-bold border border-[#00f2fe]/30 shadow-[0_0_16px_rgba(0,242,254,0.12)]'
                    : 'text-[#849495] hover:bg-[#191c22]/70 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-[#00f2fe]' : 'text-[#849495]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="font-mono text-[9px] bg-[#272a31] text-[#6ff6ff] px-1.5 py-0.5 rounded border border-[#3a494b] font-semibold">
                      {item.badge}
                    </span>
                  )}
                  {item.hasPulse && (
                    <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse shadow-[0_0_8px_#00f2fe]" />
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Vault Enclave & Node Telemetry Badge */}
      <div className="flex flex-col gap-2.5 bg-[#191c22] p-3 rounded-xl border border-[#272a31]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* User Avatar Matrix */}
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#00f2fe] to-[#f7931a] p-0.5">
              <div className="w-full h-full rounded-full bg-[#0b0e14] flex items-center justify-center font-mono font-bold text-[10px] text-white">
                0x7A
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#00e475] ring-2 ring-[#0b0e14]" />
            </div>

            <div className="flex flex-col">
              <span className="font-mono text-xs font-semibold text-white tracking-wide">
                0x7A9f...b420
              </span>
              <span className="font-mono text-[9px] text-[#f7931a] font-bold">
                VIP TIER 3
              </span>
            </div>
          </div>

          <button
            onClick={() => setCurrentTab('wallet')}
            title="Account & Enclave Settings"
            className="text-[#849495] hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Node Health Status */}
        <div className="flex items-center justify-between pt-1.5 border-t border-[#272a31]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e475] animate-pulse" />
            <span className="font-mono text-[9px] text-[#849495] uppercase">
              NODE: SYNCED
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#00e475] font-bold">
            99.98%
          </span>
        </div>
      </div>
    </aside>
  );
}
