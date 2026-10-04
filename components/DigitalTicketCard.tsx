'use client';

import React from 'react';
import { BTCTicket, CandleBias } from '@/types';
import { ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface DigitalTicketCardProps {
  ticket?: BTCTicket;
  customDigits?: {
    open: [number, number];
    high: [number, number];
    close: [number, number];
  };
  customBias?: CandleBias;
  customMultiplier?: number;
  customStake?: number;
  isInteractivePreview?: boolean;
  onClaim?: () => void;
}

export function DigitalTicketCard({
  ticket,
  customDigits,
  customBias,
  customMultiplier = 1,
  customStake = 10,
  isInteractivePreview = false,
  onClaim,
}: DigitalTicketCardProps) {
  // Determine data from ticket or custom props
  const openStr = ticket
    ? `${ticket.digits.open[0]}${ticket.digits.open[1]}`
    : customDigits
    ? `${customDigits.open[0]}${customDigits.open[1]}`
    : '42';

  const highStr = ticket
    ? `${ticket.digits.high[0]}${ticket.digits.high[1]}`
    : customDigits
    ? `${customDigits.high[0]}${customDigits.high[1]}`
    : '78';

  const closeStr = ticket
    ? `${ticket.digits.close[0]}${ticket.digits.close[1]}`
    : customDigits
    ? `${customDigits.close[0]}${customDigits.close[1]}`
    : '31';

  const bias = ticket ? ticket.bias : customBias || 'BULL';
  const multiplier = ticket ? ticket.multiplier : customMultiplier;
  const stake = ticket ? ticket.stake : customStake;
  const potentialPayout = ticket ? ticket.potentialPayout : stake * 360;
  const txId = ticket ? ticket.id : 'TX-9842-881A';
  const candleTime = ticket ? ticket.candleHourUTC : '14:00 UTC CANDLE';
  const status = ticket ? ticket.status : 'ACTIVE';

  return (
    <div className="relative rounded-2xl bg-[#0b0e14] p-3 sm:p-4 border border-[#1e293b] shadow-[0_12px_36px_rgba(0,0,0,0.6)] overflow-hidden group">
      {/* Holographic foil ambient background sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00f2fe]/10 via-transparent to-[#f7931a]/10 pointer-events-none opacity-80" />
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#00f2fe]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Internal Ticket Slip Frame */}
      <div className="relative rounded-xl bg-[#131c2e]/90 p-4 sm:p-5 border border-[#272a31] flex flex-col gap-3.5 ticket-scanline">
        {/* Ticket Header & NFT Slip Badge */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1d2026] border border-[#00f2fe]/40 flex items-center justify-center text-[#00f2fe] font-sans font-black text-lg shadow-[0_0_12px_rgba(0,242,254,0.25)]">
              ₿
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-sm sm:text-base text-white tracking-wider flex items-center gap-1.5">
                BTC6 // TICKET
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#849495]">
                NFT SLIP · PROVABLY-FAIR
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] font-bold text-[#6ff6ff] bg-[#1d2026] px-2 py-0.5 rounded border border-[#3a494b]">
              {txId}
            </span>
            <span className="font-mono text-[9px] text-[#849495] mt-0.5">
              {candleTime}
            </span>
          </div>
        </div>

        {/* Laser Grid Divider */}
        <div className="w-full h-0.5 bg-gradient-to-r from-[#00f2fe] via-[#32353c] to-[#f7931a] rounded-full opacity-70" />

        {/* 4-Field Prediction Summary Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          {/* OPEN Box */}
          <div className="bg-[#10131a] p-2.5 rounded-lg border border-[#272a31] flex flex-col">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#849495]">
              DIGIT 1: OPEN
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-mono text-[10px] text-[#3a494b]">[XX]</span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#00f2fe] tracking-wider">
                {openStr}
              </span>
            </div>
          </div>

          {/* HIGH Box */}
          <div className="bg-[#10131a] p-2.5 rounded-lg border border-[#272a31] flex flex-col">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#849495]">
              DIGIT 2: HIGH
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-mono text-[10px] text-[#3a494b]">[XX]</span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#00e475] tracking-wider">
                {highStr}
              </span>
            </div>
          </div>

          {/* CLOSE Box */}
          <div className="bg-[#10131a] p-2.5 rounded-lg border border-[#272a31] flex flex-col">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#849495]">
              DIGIT 3: CLOSE
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-mono text-[10px] text-[#3a494b]">[XX]</span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#f7931a] tracking-wider">
                {closeStr}
              </span>
            </div>
          </div>

          {/* VECTOR BIAS Box */}
          <div className="bg-[#10131a] p-2.5 rounded-lg border border-[#272a31] flex flex-col">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#849495]">
              VECTOR BIAS
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span
                className={`font-mono text-sm sm:text-base font-bold flex items-center gap-1 ${
                  bias === 'BULL'
                    ? 'text-[#00e475]'
                    : bias === 'BEAR'
                    ? 'text-[#ff5252]'
                    : 'text-[#e1e2eb]'
                }`}
              >
                {bias === 'BULL' ? 'GREEN ▲' : bias === 'BEAR' ? 'RED ▼' : 'DOJI ▬'}
              </span>
            </div>
          </div>
        </div>

        {/* Staking Specs Breakdown */}
        <div className="bg-[#10131a] p-2.5 rounded-lg border border-[#1e293b] flex flex-col gap-1 font-mono text-[11px]">
          <div className="flex items-center justify-between text-[#849495]">
            <span>STAKE MULTIPLIER</span>
            <span className="text-white font-semibold">{multiplier}x ({stake.toFixed(2)} USDT)</span>
          </div>
          <div className="flex items-center justify-between text-[#849495]">
            <span>PAYOUT MULTIPLIER</span>
            <span className="text-[#00e475] font-semibold">360x ACCUMULATOR</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#1e293b]">
            <span className="text-[#849495]">PAYOUT ESTIMATE</span>
            <span className="text-[#00f2fe] font-bold text-xs sm:text-sm">
              {potentialPayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
            </span>
          </div>
        </div>

        {/* Cryptographic Seal & Barcode Strip */}
        <div className="flex items-center justify-between pt-2 bg-[#0b0e14]/70 px-3 py-2 rounded-lg border border-[#1e293b]">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#00e475] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#00e475]" /> PROVABLY FAIR PROTOCOL
            </span>
            <span className="font-mono text-[8px] text-[#849495] truncate max-w-[160px] sm:max-w-[210px] mt-0.5">
              SHA256: {ticket ? ticket.serverSeedHash.substring(0, 16) + '...' : 'e8bf01...b83a901f'}
            </span>
          </div>

          {/* Stylized Barcode Graphic */}
          <div className="flex items-center gap-0.5 h-6 select-none opacity-80">
            <span className="w-1 h-full bg-[#00f2fe]" />
            <span className="w-0.5 h-full bg-[#3a494b]" />
            <span className="w-1.5 h-full bg-white" />
            <span className="w-0.5 h-full bg-transparent" />
            <span className="w-2 h-full bg-[#00f2fe]" />
            <span className="w-0.5 h-full bg-white" />
            <span className="w-1 h-full bg-[#3a494b]" />
            <span className="w-1.5 h-full bg-white" />
            <span className="w-0.5 h-full bg-[#00f2fe]" />
            <span className="w-1 h-full bg-[#3a494b]" />
          </div>
        </div>

        {/* Ticket Footer / Status */}
        <div className="flex items-center justify-between font-mono text-[9px] text-[#849495] pt-0.5">
          <span>NETWORK: ARBITRUM ONE</span>
          {status === 'ACTIVE' && (
            <span className="text-[#00f2fe] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse" />
              IN ORBIT / ACTIVE
            </span>
          )}
          {status === 'WON' && (
            <div className="flex items-center gap-2">
              <span className="text-[#00e475] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> WON MATCH
              </span>
              {onClaim && (
                <button
                  onClick={onClaim}
                  className="px-2 py-0.5 rounded bg-[#00e475] text-[#00210b] font-bold hover:bg-[#62ff96] transition-colors"
                >
                  CLAIM
                </button>
              )}
            </div>
          )}
          {status === 'CLAIMED' && (
            <span className="text-[#849495] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#00e475]" /> SETTLED & CLAIMED
            </span>
          )}
          {status === 'LOST' && (
            <span className="text-[#ff5252] font-semibold flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> MISSED CLOSE
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
