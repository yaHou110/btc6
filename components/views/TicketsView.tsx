'use client';

import React, { useState } from 'react';
import { useBTC6 } from '@/context/BTC6Context';
import { DigitalTicketCard } from '@/components/DigitalTicketCard';
import { Ticket, Filter, CheckCircle2, Award, Zap } from 'lucide-react';

export function TicketsView() {
  const { tickets, unclaimedSettlement, claimSettlement, setCurrentTab } = useBTC6();
  const [filter, setFilter] = useState<'all' | 'active' | 'won' | 'settled'>('all');

  const filteredTickets = tickets.filter((t) => {
    if (filter === 'active') return t.status === 'ACTIVE';
    if (filter === 'won') return t.status === 'WON';
    if (filter === 'settled') return t.status === 'CLAIMED' || t.status === 'LOST';
    return true;
  });

  const activeCount = tickets.filter((t) => t.status === 'ACTIVE').length;
  const wonCount = tickets.filter((t) => t.status === 'WON').length;
  const settledCount = tickets.filter((t) => t.status === 'CLAIMED' || t.status === 'LOST').length;

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto w-full pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0b0e14] p-4 sm:p-6 rounded-2xl border border-[#1e293b] shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#191c22] border border-[#00f2fe]/30 flex items-center justify-center text-[#00f2fe]">
            <Ticket className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-sans font-bold text-lg sm:text-xl text-white">
              My Digital Prediction Tickets
            </h1>
            <span className="font-mono text-xs text-[#849495]">
              Cryptographically signed NFT slips for 1-hour candle settlements
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {unclaimedSettlement > 0 && (
            <button
              onClick={() => claimSettlement()}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#00e475] hover:bg-[#62ff96] text-[#00210b] font-mono text-xs font-bold uppercase transition-all shadow-[0_0_16px_rgba(0,228,117,0.35)] flex items-center justify-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Claim All ({unclaimedSettlement.toFixed(2)} USDT)</span>
            </button>
          )}

          <button
            onClick={() => setCurrentTab('play')}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#00f2fe] hover:bg-[#6ff6ff] text-[#002022] font-mono text-xs font-bold uppercase transition-all shadow-[0_0_16px_rgba(0,242,254,0.3)] flex items-center justify-center gap-1.5"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Mint New Ticket</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 bg-[#0b0e14] p-1.5 rounded-xl border border-[#1e293b]">
          {[
            { id: 'all', label: `All Tickets (${tickets.length})` },
            { id: 'active', label: `Active (${activeCount})` },
            { id: 'won', label: `Won / Claimable (${wonCount})` },
            { id: 'settled', label: `Settled (${settledCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-[#191c22] text-[#00f2fe] border border-[#00f2fe]/40 shadow-sm'
                  : 'text-[#849495] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket Grid */}
      {filteredTickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredTickets.map((ticket) => (
            <DigitalTicketCard
              key={ticket.id}
              ticket={ticket}
              onClaim={ticket.status === 'WON' ? () => claimSettlement(ticket.id) : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 bg-[#0b0e14] rounded-2xl border border-[#1e293b] text-center gap-3">
          <Ticket className="w-12 h-12 text-[#3a494b]" />
          <span className="font-sans font-bold text-base text-white">
            No tickets match this filter
          </span>
          <p className="font-sans text-xs text-[#849495] max-w-sm">
            Head to the Terminal to forecast the upcoming 1-hour Bitcoin candle parameters.
          </p>
          <button
            onClick={() => setCurrentTab('play')}
            className="mt-2 px-4 py-2 rounded-xl bg-[#00f2fe] text-[#002022] font-mono text-xs font-bold uppercase"
          >
            Launch Terminal
          </button>
        </div>
      )}
    </div>
  );
}
