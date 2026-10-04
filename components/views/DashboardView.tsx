'use client';

import React, { useState } from 'react';
import { useBTC6 } from '@/context/BTC6Context';
import { CandleBias } from '@/types';
import {
  Wallet,
  Ticket,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Layers,
} from 'lucide-react';

export function DashboardView() {
  const {
    walletBalance,
    tickets,
    candleData,
    mintTicket,
    setCurrentTab,
    showToast,
  } = useBTC6();

  const [copiedSeed, setCopiedSeed] = useState(false);
  const [quickTens, setQuickTens] = useState('5');
  const [quickUnits, setQuickUnits] = useState('8');
  const [quickBias, setQuickBias] = useState<CandleBias>('BULL');
  const [quickWager, setQuickWager] = useState<number>(100);

  const activeTickets = tickets.filter((t) => t.status === 'ACTIVE');
  const recentTickets = tickets.slice(0, 4);

  // Active top ticket for live comparison matrix (default to #TK-8841 or first active)
  const activeTicket = tickets.find((t) => t.id === 'TK-8841') || tickets[0];

  const handleCopyClientSeed = () => {
    navigator.clipboard.writeText(candleData.activeClientSeed);
    setCopiedSeed(true);
    setTimeout(() => setCopiedSeed(false), 2000);
  };

  const handleQuickDeploy = () => {
    const d1 = parseInt(quickTens, 10) || 0;
    const d2 = parseInt(quickUnits, 10) || 0;
    const mult = Math.max(1, Math.round(quickWager / 10));

    const newTk = mintTicket(
      {
        open: candleData.currentOpenDigits,
        high: candleData.currentHighDigits,
        close: [d1, d2],
      },
      quickBias,
      mult,
      quickWager
    );

    if (newTk) {
      showToast('Quick Ticket Transmitted', `Ticket #${newTk.id} transmitted to engine.`, 'success');
    }
  };

  const randomizeQuick = () => {
    setQuickTens(Math.floor(Math.random() * 10).toString());
    setQuickUnits(Math.floor(Math.random() * 10).toString());
  };

  // Format countdown
  const mins = Math.floor(candleData.secondsRemaining / 60);
  const secs = candleData.secondsRemaining % 60;
  const timeFormatted = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;

  return (
    <div className="flex flex-col gap-6 max-w-[1720px] mx-auto w-full pb-12">
      {/* Top System Notification Ribbon */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-[#0b0e14] px-4 py-2.5 rounded-xl border border-[#1e293b] shadow-lg">
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-ping" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#00f2fe] font-bold">
              ENGINE CLUSTER: OMEGA-09
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#849495]">
            <span>LATENCY:</span>
            <span className="text-[#00e475] font-bold">14ms</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 font-mono text-[10px] text-[#849495]">
            <span>TARGET PAIR:</span>
            <span className="text-white font-semibold">BINANCE:BTCUSDT.P</span>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#849495]">
            <span>EPOCH DRIFT:</span>
            <span className="text-white font-semibold">+0.0024s</span>
          </div>
          <div className="flex items-center gap-1 bg-[#191c22] px-2 py-0.5 rounded text-[#00e475] font-mono text-[10px] border border-[#272a31]">
            <ShieldCheck className="w-3 h-3 text-[#00e475]" />
            <span>ORACLE ATTESTED</span>
          </div>
        </div>
      </div>

      {/* 4 Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Metric 1: Total Ledger Balance */}
        <div className="relative bg-[#0b0e14] p-4 sm:p-5 rounded-2xl border border-[#1e293b] flex flex-col justify-between shadow-xl overflow-hidden group hover:border-[#00f2fe]/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#00f2fe]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase text-[#849495] tracking-wider font-semibold">
                Total Ledger Balance
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                  {walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="font-mono text-xs text-[#00f2fe] font-bold">USDT</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#191c22] border border-[#272a31] text-[#00f2fe]">
              <Wallet className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between gap-2 pt-2 border-t border-[#1e293b]">
            <div className="flex items-center gap-1 font-mono text-[11px] text-[#00e475] font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+14.2%</span>
              <span className="font-sans text-[10px] text-[#849495] font-normal ml-0.5">
                7D VELOCITY
              </span>
            </div>

            {/* Sparkline Visualizer */}
            <div className="w-24 h-7">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 32" preserveAspectRatio="none">
                <path
                  d="M0 26 L16 22 L32 24 L48 16 L64 19 L80 8 L100 4"
                  fill="none"
                  stroke="#00f2fe"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Metric 2: Active Digital Tickets */}
        <div className="relative bg-[#0b0e14] p-4 sm:p-5 rounded-2xl border border-[#1e293b] flex flex-col justify-between shadow-xl overflow-hidden group hover:border-[#00f2fe]/40 transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase text-[#849495] tracking-wider font-semibold">
                Active Digital Tickets
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#00f2fe]">
                  0{activeTickets.length}
                </span>
                <span className="font-mono text-xs text-[#849495] font-medium">IN ORBIT</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#191c22] border border-[#272a31] text-[#6ff6ff]">
              <Ticket className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1.5 pt-2 border-t border-[#1e293b]">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span className="text-[#849495]">EST. AGGREGATE PAYOUT</span>
              <span className="text-[#00e475] font-bold">10,800.00 USDT</span>
            </div>
            <div className="w-full bg-[#191c22] h-1.5 rounded-full overflow-hidden flex">
              <div className="bg-[#00f2fe] h-full w-[45%]" />
              <div className="bg-[#00e475] h-full w-[35%]" />
              <div className="bg-[#f7931a] h-full w-[20%]" />
            </div>
          </div>
        </div>

        {/* Metric 3: Model Accuracy */}
        <div className="relative bg-[#0b0e14] p-4 sm:p-5 rounded-2xl border border-[#1e293b] flex flex-col justify-between shadow-xl overflow-hidden group hover:border-[#00e475]/40 transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase text-[#849495] tracking-wider font-semibold">
                Model Accuracy
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#00e475]">
                  64.8%
                </span>
                <span className="font-mono text-xs text-[#00e475] font-medium">ALPHA</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#191c22] border border-[#272a31] text-[#00e475]">
              <Activity className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-[#849495] pt-2 border-t border-[#1e293b]">
            <span>WINDOW: L50 ROUNDS</span>
            <span className="text-white font-bold">32W / 18L</span>
          </div>
        </div>

        {/* Metric 4: All-Time Yield Claimed */}
        <div className="relative bg-[#0b0e14] p-4 sm:p-5 rounded-2xl border border-[#1e293b] flex flex-col justify-between shadow-xl overflow-hidden group hover:border-[#f7931a]/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#f7931a]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase text-[#849495] tracking-wider font-semibold">
                All-Time Yield Claimed
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#f7931a]">
                  48,920.00
                </span>
                <span className="font-mono text-xs text-[#f7931a] font-bold">USDT</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#191c22] border border-[#272a31] text-[#f7931a]">
              <Award className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between pt-2 border-t border-[#1e293b]">
            <span className="font-mono text-[10px] bg-[#f7931a]/15 text-[#f7931a] px-2 py-0.5 rounded font-bold border border-[#f7931a]/30">
              0.7610 BTC EQUIV
            </span>
            <span className="font-mono text-[10px] text-[#849495]">TX COUNT: 142</span>
          </div>
        </div>
      </div>

      {/* Main Mission Control Grid: 8 cols left, 4 cols right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Active Candle & Matrix Comparison */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Candle #1400 In-Flight Progress */}
          <div className="relative bg-[#0b0e14] rounded-2xl border border-[#1e293b] p-4 sm:p-5 overflow-hidden shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f2fe] via-[#00e475] to-[#f7931a]" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#00f2fe] animate-pulse shadow-[0_0_10px_#00f2fe]" />
                <div className="flex flex-col">
                  <span className="font-sans font-extrabold text-base sm:text-lg text-white">
                    CANDLE #{candleData.roundNumber} IN FLIGHT
                  </span>
                  <span className="font-mono text-[9px] text-[#849495] tracking-wider">
                    SETTLEMENT ENGINE: SHA-256 BINARY BLOCK #{candleData.blockHeight}
                  </span>
                </div>
              </div>

              {/* Countdown Pill */}
              <div className="flex items-center gap-1.5 bg-[#191c22] px-3 py-1.5 rounded-lg border border-[#272a31]">
                <Clock className="w-3.5 h-3.5 text-[#f7931a]" />
                <span className="font-mono text-[9px] text-[#849495] uppercase">CLOSES IN:</span>
                <span className="font-mono text-sm sm:text-base text-[#f7931a] font-bold tracking-wider">
                  {timeFormatted}
                </span>
              </div>
            </div>

            {/* Progress track */}
            <div className="w-full bg-[#191c22] h-2 rounded-full overflow-hidden mt-1">
              <div
                className="bg-gradient-to-r from-[#00f2fe] via-[#00e475] to-[#f7931a] h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(0,242,254,0.4)]"
                style={{ width: `${candleData.progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between items-center mt-2 font-mono text-[10px] text-[#849495]">
              <span>START: 14:00:00 UTC</span>
              <span className="text-[#00f2fe] font-bold">{candleData.progressPercent}% RESOLVED</span>
              <span>END: 15:00:00 UTC</span>
            </div>
          </div>

          {/* Live Comparison Matrix Card: Active Ticket vs Live Candle Numbers */}
          <div className="bg-[#0b0e14] rounded-2xl border border-[#1e293b] p-4 sm:p-6 shadow-xl relative overflow-hidden flex flex-col gap-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#191c22] border border-[#272a31] flex items-center justify-center text-[#00f2fe] shadow-inner">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-bold text-base text-white">
                      Ticket #{activeTicket.id}
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[9px] bg-[#00e475]/15 text-[#00e475] border border-[#00e475]/30 font-bold tracking-wider animate-pulse">
                      JACKPOT ELIGIBLE
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-[#849495]">
                    STAKE: {activeTicket.stake.toFixed(2)} USDT | TIERS: 4-WAY DIGIT RESOLUTION
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="font-mono text-[9px] text-[#849495]">DYNAMIC MULTIPLIER</span>
                <span className="font-mono text-base sm:text-lg font-bold text-[#00f2fe]">
                  43.20x POTENTIAL
                </span>
              </div>
            </div>

            {/* Comparison 4-Block Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {/* OPEN DIGIT BLOCK */}
              <div className="bg-[#10131a] rounded-xl border border-[#272a31] p-3.5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-[#849495] uppercase tracking-wider font-semibold">
                    OPEN (2D)
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#00e475]/20 text-[#00e475] font-mono text-[8px] font-bold">
                    LOCKED
                  </span>
                </div>

                <div className="my-3 flex items-center justify-around py-2 bg-[#0b0e14] rounded-lg border border-[#1e293b]">
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[9px] text-[#849495] mb-0.5">PRED</span>
                    <span className="font-mono text-xl font-bold text-white">
                      {activeTicket.digits.open[0]}
                      {activeTicket.digits.open[1]}
                    </span>
                  </div>
                  <div className="w-px h-7 bg-[#272a31]" />
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[9px] text-[#00e475] mb-0.5">ACTUAL</span>
                    <span className="font-mono text-xl font-bold text-[#00e475] drop-shadow-[0_0_8px_rgba(0,228,117,0.6)]">
                      {candleData.currentOpenDigits[0]}
                      {candleData.currentOpenDigits[1]}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#00e475] font-mono text-[9px] font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>PERFECT MATCH (+100 PTS)</span>
                </div>
              </div>

              {/* HIGH DIGIT BLOCK */}
              <div className="bg-[#10131a] rounded-xl border border-[#272a31] p-3.5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-[#849495] uppercase tracking-wider font-semibold">
                    HIGH (2D)
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#00f2fe]/20 text-[#00f2fe] font-mono text-[8px] font-bold">
                    LIVE PEAK
                  </span>
                </div>

                <div className="my-3 flex items-center justify-around py-2 bg-[#0b0e14] rounded-lg border border-[#1e293b]">
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[9px] text-[#849495] mb-0.5">PRED</span>
                    <span className="font-mono text-xl font-bold text-white">
                      {activeTicket.digits.high[0]}
                      {activeTicket.digits.high[1]}
                    </span>
                  </div>
                  <div className="w-px h-7 bg-[#272a31]" />
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[9px] text-[#00f2fe] mb-0.5">ACTUAL</span>
                    <span className="font-mono text-xl font-bold text-[#00f2fe]">
                      {candleData.currentHighDigits[0]}
                      {candleData.currentHighDigits[1]}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[#849495] font-mono text-[9px]">
                  <span>VARIANCE:</span>
                  <span className="text-[#f7931a] font-bold">DIFF: -04</span>
                </div>
              </div>

              {/* CLOSE DIGIT BLOCK */}
              <div className="bg-[#10131a] rounded-xl border border-[#272a31] p-3.5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-[#849495] uppercase tracking-wider font-semibold">
                    CLOSE (2D)
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#f7931a]/20 text-[#f7931a] font-mono text-[8px] font-bold">
                    ACTIVE
                  </span>
                </div>

                <div className="my-3 flex items-center justify-around py-2 bg-[#0b0e14] rounded-lg border border-[#1e293b]">
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[9px] text-[#849495] mb-0.5">PRED</span>
                    <span className="font-mono text-xl font-bold text-white">
                      {activeTicket.digits.close[0]}
                      {activeTicket.digits.close[1]}
                    </span>
                  </div>
                  <div className="w-px h-7 bg-[#272a31]" />
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[9px] text-[#f7931a] mb-0.5">CURRENT</span>
                    <span className="font-mono text-xl font-bold text-[#f7931a] animate-pulse">
                      {candleData.currentCloseDigits[0]}
                      {candleData.currentCloseDigits[1]}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[#849495] font-mono text-[9px]">
                  <span>ACCURACY GAP:</span>
                  <span className="text-[#00e475] font-bold">2 DIGITS CLOSING</span>
                </div>
              </div>

              {/* CANDLE COLOR / VECTOR BLOCK */}
              <div className="bg-[#10131a] rounded-xl border border-[#272a31] p-3.5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-[#849495] uppercase tracking-wider font-semibold">
                    VECTOR
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#00e475]/20 text-[#00e475] font-mono text-[8px] font-bold">
                    1H TREND
                  </span>
                </div>

                <div className="my-3 flex items-center justify-around py-2 bg-[#0b0e14] rounded-lg border border-[#1e293b]">
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[9px] text-[#849495] mb-0.5">PRED</span>
                    <span className="font-mono text-sm font-bold text-[#00e475]">
                      {activeTicket.bias}
                    </span>
                  </div>
                  <div className="w-px h-7 bg-[#272a31]" />
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[9px] text-[#00e475] mb-0.5">ACTUAL</span>
                    <span className="font-mono text-sm font-bold text-[#00e475] flex items-center gap-0.5">
                      <span>▲</span> GREEN
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#00e475] font-mono text-[9px] font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>COLOR ALIGNED</span>
                </div>
              </div>
            </div>

            {/* Bottom Visualizer: Live Feed Wave */}
            <div className="bg-[#0b0e14] p-4 rounded-xl border border-[#1e293b] flex flex-col gap-2">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#849495] uppercase tracking-wider">
                  Real-Time Sub-Second Price Velocity
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[#849495]">
                    INDEX: ${candleData.spotPrice.toFixed(2)}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#00e475]" />
                </div>
              </div>

              {/* Dynamic SVG Wave */}
              <div className="w-full h-16 relative flex items-end">
                <svg className="w-full h-full" viewBox="0 0 600 60" preserveAspectRatio="none">
                  <path
                    d="M0,45 Q50,48 100,32 T200,28 T300,35 T400,20 T500,24 T600,12"
                    fill="none"
                    stroke="#00dce6"
                    strokeWidth="2"
                  />
                  <path
                    d="M0,45 Q50,48 100,32 T200,28 T300,35 T400,20 T500,24 T600,12 L600,60 L0,60 Z"
                    fill="rgba(0, 242, 254, 0.08)"
                  />
                  <circle cx="600" cy="12" r="4" fill="#00f2fe" className="animate-ping" />
                  <circle cx="600" cy="12" r="3" fill="#00f2fe" />
                </svg>
              </div>
            </div>
          </div>

          {/* Cryptographic Proof-of-Candle Widget */}
          <div className="bg-[#0b0e14] rounded-2xl border border-[#1e293b] p-4 sm:p-5 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00f2fe]" />
                <span className="font-sans font-bold text-sm text-white">
                  Cryptographic Proof-of-Candle
                </span>
              </div>
              <button
                onClick={() => setCurrentTab('rules')}
                className="font-mono text-[10px] text-[#00f2fe] hover:underline flex items-center gap-1"
              >
                <span>VERIFY ON-CHAIN</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="bg-[#10131a] p-3 rounded-xl border border-[#272a31] flex flex-col gap-1">
                <span className="font-mono text-[9px] text-[#849495] uppercase">
                  Active Client Seed (Committed)
                </span>
                <div className="flex items-center justify-between bg-[#0b0e14] px-2.5 py-1.5 rounded-lg border border-[#1e293b]">
                  <span className="font-mono text-[11px] text-white truncate pr-2">
                    {candleData.activeClientSeed}
                  </span>
                  <button
                    onClick={handleCopyClientSeed}
                    className="text-[#849495] hover:text-[#00f2fe] transition-colors"
                  >
                    {copiedSeed ? <Check className="w-3.5 h-3.5 text-[#00e475]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="bg-[#10131a] p-3 rounded-xl border border-[#272a31] flex flex-col gap-1">
                <span className="font-mono text-[9px] text-[#849495] uppercase">
                  Server Seed Hash (SHA-256 Oracle)
                </span>
                <div className="flex items-center justify-between bg-[#0b0e14] px-2.5 py-1.5 rounded-lg border border-[#1e293b]">
                  <span className="font-mono text-[11px] text-white truncate pr-2">
                    {candleData.serverSeedHash}
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00e475] shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Quick Deploy & Recent Submissions */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Quick Deploy Widget */}
          <div className="bg-[#0b0e14] rounded-2xl border border-[#1e293b] p-4 sm:p-5 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#00f2fe]" />
                <span className="font-sans font-bold text-sm text-white">Quick Deploy</span>
              </div>
              <span className="font-mono text-[10px] bg-[#191c22] px-2 py-0.5 rounded text-[#849495] border border-[#272a31] font-semibold">
                ROUND #{candleData.roundNumber}
              </span>
            </div>

            {/* Digit Input */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#849495] uppercase">Predict Last 2 Digits (Close)</span>
                <button
                  onClick={randomizeQuick}
                  className="text-[#00f2fe] hover:underline cursor-pointer"
                >
                  RANDOMIZE
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#10131a] p-2 rounded-lg border border-[#272a31] flex flex-col items-center">
                  <span className="font-mono text-[9px] text-[#849495] mb-1">TENS</span>
                  <input
                    type="text"
                    maxLength={1}
                    value={quickTens}
                    onChange={(e) => setQuickTens(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full bg-[#0b0e14] text-center font-mono text-2xl font-bold text-[#00f2fe] py-1.5 rounded border border-[#272a31] focus:outline-none focus:border-[#00f2fe]"
                  />
                </div>

                <div className="bg-[#10131a] p-2 rounded-lg border border-[#272a31] flex flex-col items-center">
                  <span className="font-mono text-[9px] text-[#849495] mb-1">UNITS</span>
                  <input
                    type="text"
                    maxLength={1}
                    value={quickUnits}
                    onChange={(e) => setQuickUnits(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full bg-[#0b0e14] text-center font-mono text-2xl font-bold text-[#00f2fe] py-1.5 rounded border border-[#272a31] focus:outline-none focus:border-[#00f2fe]"
                  />
                </div>
              </div>
            </div>

            {/* Bias Selector */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] text-[#849495] uppercase">
                Predicted Candle Bias
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setQuickBias('BULL')}
                  className={`py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                    quickBias === 'BULL'
                      ? 'bg-[#00e475]/15 text-[#00e475] border border-[#00e475]'
                      : 'bg-[#10131a] text-[#849495] border border-[#272a31]'
                  }`}
                >
                  BULL
                </button>
                <button
                  onClick={() => setQuickBias('DOJI')}
                  className={`py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                    quickBias === 'DOJI'
                      ? 'bg-[#32353c] text-white border border-white'
                      : 'bg-[#10131a] text-[#849495] border border-[#272a31]'
                  }`}
                >
                  DOJI
                </button>
                <button
                  onClick={() => setQuickBias('BEAR')}
                  className={`py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                    quickBias === 'BEAR'
                      ? 'bg-[#ff5252]/15 text-[#ff5252] border border-[#ff5252]'
                      : 'bg-[#10131a] text-[#849495] border border-[#272a31]'
                  }`}
                >
                  BEAR
                </button>
              </div>
            </div>

            {/* Wager Selector */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center font-mono text-[10px] text-[#849495]">
                <span>WAGER AMOUNT</span>
                <span>BAL: {walletBalance.toFixed(0)} USDT</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[50, 100, 250, 500].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setQuickWager(amt)}
                    className={`py-1.5 rounded font-mono text-xs font-bold transition-all ${
                      quickWager === amt
                        ? 'bg-[#191c22] text-[#00f2fe] border border-[#00f2fe]/40'
                        : 'bg-[#10131a] text-[#849495] border border-[#272a31]'
                    }`}
                  >
                    {amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Transmit Action */}
            <button
              onClick={handleQuickDeploy}
              className="w-full bg-[#00f2fe] hover:bg-[#6ff6ff] text-[#002022] py-3 rounded-xl font-mono text-xs font-extrabold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,242,254,0.35)] flex items-center justify-center gap-2 active:scale-98"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>TRANSMIT TICKET ({quickWager} USDT)</span>
            </button>
          </div>

          {/* Recent Submissions Gallery */}
          <div className="bg-[#0b0e14] rounded-2xl border border-[#1e293b] p-4 sm:p-5 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-sans font-bold text-sm text-white">Recent Submissions</span>
              <button
                onClick={() => setCurrentTab('tickets')}
                className="font-mono text-[10px] text-[#849495] hover:text-[#00f2fe] transition-colors"
              >
                VIEW ALL ({tickets.length})
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {recentTickets.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#10131a] rounded-xl border border-[#272a31] p-3 flex flex-col gap-1.5 hover:border-[#3a494b] transition-colors"
                >
                  <div className="flex items-center justify-between font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">#{t.id}</span>
                      <span className="text-[9px] text-[#849495]">ROUND #{t.roundNumber}</span>
                    </div>

                    {t.status === 'WON' && (
                      <span className="bg-[#00e475]/15 text-[#00e475] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#00e475]/30">
                        WON MATCH
                      </span>
                    )}
                    {t.status === 'CLAIMED' && (
                      <span className="bg-[#00e475]/20 text-[#00e475] text-[9px] font-bold px-1.5 py-0.5 rounded">
                        CLAIMED
                      </span>
                    )}
                    {t.status === 'ACTIVE' && (
                      <span className="bg-[#00f2fe]/15 text-[#00f2fe] text-[9px] font-bold px-1.5 py-0.5 rounded">
                        IN FLIGHT
                      </span>
                    )}
                    {t.status === 'LOST' && (
                      <span className="bg-[#191c22] text-[#849495] text-[9px] font-semibold px-1.5 py-0.5 rounded">
                        MISSED CLOSE
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[#849495]">
                        PICKS:{' '}
                        <strong className="text-white">
                          {t.digits.open[0]}
                          {t.digits.open[1]} · {t.digits.high[0]}
                          {t.digits.high[1]} · {t.digits.close[0]}
                          {t.digits.close[1]}
                        </strong>
                      </span>
                      <span className={t.bias === 'BULL' ? 'text-[#00e475] font-bold' : 'text-[#ff5252] font-bold'}>
                        {t.bias}
                      </span>
                    </div>

                    <div>
                      {t.wonAmount ? (
                        <span className="text-[#00e475] font-bold">
                          +{t.wonAmount.toLocaleString()} USDT
                        </span>
                      ) : (
                        <span className="text-white font-semibold">{t.stake} USDT</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[9px] text-[#849495] pt-1 border-t border-[#1e293b]">
                    <span>TX: {t.txHash}</span>
                    <span>POTENTIAL: {t.potentialPayout} USDT</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-[#849495] border-t border-[#1e293b]">
              <span>BLOCKCHAIN VERIFIED ENTRIES</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#00e475]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
