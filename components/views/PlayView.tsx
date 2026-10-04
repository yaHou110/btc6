'use client';

import React, { useState } from 'react';
import { useBTC6 } from '@/context/BTC6Context';
import { DigitalTicketCard } from '@/components/DigitalTicketCard';
import { CandleBias, PredictionDigits } from '@/types';
import {
  Zap,
  Dices,
  ChevronUp,
  ChevronDown,
  Timer,
  ShieldCheck,
  TrendingUp,
  History,
  Lock,
} from 'lucide-react';

export function PlayView() {
  const { candleData, mintTicket, roundHistory, walletBalance, showToast } = useBTC6();

  // Prediction Form State
  const [digits, setDigits] = useState<PredictionDigits>({
    open: [4, 2],
    high: [7, 8],
    close: [3, 1],
  });

  const [bias, setBias] = useState<CandleBias>('BULL');
  const [multiplier, setMultiplier] = useState<number>(1);
  const baseStake = 10;
  const totalStake = baseStake * multiplier;
  const estPayout = totalStake * 360;

  // Adjust individual digit with wrap-around 0-9
  const adjustDigit = (category: 'open' | 'high' | 'close', index: 0 | 1, delta: number) => {
    setDigits((prev) => {
      const current = prev[category][index];
      const next = (current + delta + 10) % 10;
      const updated = [...prev[category]] as [number, number];
      updated[index] = next;
      return { ...prev, [category]: updated };
    });
  };

  const setPair = (category: 'open' | 'high' | 'close', d1: number, d2: number) => {
    setDigits((prev) => ({
      ...prev,
      [category]: [d1, d2],
    }));
  };

  const randomizeAll = () => {
    const r = () => Math.floor(Math.random() * 10);
    const colors: CandleBias[] = ['BULL', 'BEAR', 'DOJI'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];

    setDigits({
      open: [r(), r()],
      high: [r(), r()],
      close: [r(), r()],
    });
    setBias(chosenColor);
    showToast('Randomized Selection', 'Lucky pick parameters generated across 3 vectors.', 'info');
  };

  const handleMint = () => {
    const ticket = mintTicket(digits, bias, multiplier, totalStake);
    if (ticket) {
      // Audio cue simulation / toast is handled inside context
    }
  };

  // Format countdown
  const mins = Math.floor(candleData.secondsRemaining / 60);
  const secs = candleData.secondsRemaining % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto w-full pb-12">
      {/* Top HUD: Round Status & Candle Telemetry */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0b0e14] border border-[#1e293b] p-4 sm:p-6 shadow-xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#00f2fe]/5 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-24 w-96 h-96 rounded-full bg-[#f7931a]/5 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1e293b]">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-[9px] text-[#00f2fe] bg-[#191c22] px-2 py-0.5 rounded border border-[#272a31] uppercase tracking-wider">
                CANONICAL EPOCH // 1H CADENCE
              </span>
              <div className="flex items-center gap-1.5 bg-[#10131a] px-2 py-0.5 rounded-full border border-[#272a31]">
                <span className="w-2 h-2 rounded-full bg-[#00e475] animate-ping" />
                <span className="font-mono text-[9px] text-[#00e475] font-bold tracking-wider">
                  OPEN FOR ENTRY
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#849495]">
                ORACLE: CHAINLINK+PYTH CONSENSUS
              </span>
            </div>

            <h1 className="font-sans font-extrabold text-xl sm:text-2xl text-white tracking-tight flex items-center gap-2">
              BTC 1H PREDICTION <span className="text-[#3a494b]">/</span>{' '}
              <span className="font-mono text-lg sm:text-xl text-[#00f2fe]">
                ROUND #{candleData.roundNumber}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 bg-[#10131a] px-4 py-2 rounded-xl border border-[#272a31]">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-[#849495] uppercase tracking-wider">
                LOCK CLOSES IN
              </span>
              <span className="font-mono text-xl sm:text-2xl text-[#f7931a] font-bold tracking-tight">
                {timeFormatted}
              </span>
            </div>
            <div className="h-8 w-px bg-[#272a31]" />
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-[#849495] uppercase tracking-wider">
                LIVE BLOCK HEIGHT
              </span>
              <span className="font-mono text-sm font-semibold text-white">
                #{candleData.blockHeight}
              </span>
            </div>
          </div>
        </div>

        {/* Telemetry Strip & Candle Micro-Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-4">
          <div className="bg-[#10131a] p-3 rounded-xl border border-[#1e293b] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#849495]">
              <span className="font-mono text-[9px]">INDEX SPOT (BTC/USDT)</span>
              <TrendingUp className="w-3 h-3 text-[#00e475]" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-base sm:text-lg font-bold text-white">
                ${candleData.spotPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="font-mono text-[10px] text-[#00e475] font-semibold">
                +{candleData.change24h}%
              </span>
            </div>
          </div>

          <div className="bg-[#10131a] p-3 rounded-xl border border-[#1e293b] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#849495]">
              <span className="font-mono text-[9px]">CANDLE OPEN</span>
              <span className="font-mono text-[9px] text-[#00f2fe]">O-TAG</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-base sm:text-lg font-bold text-white">
                ${candleData.openPrice.toFixed(2)}
              </span>
              <span className="font-mono text-[9px] text-[#849495]">T-00:00</span>
            </div>
          </div>

          <div className="bg-[#10131a] p-3 rounded-xl border border-[#1e293b] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#849495]">
              <span className="font-mono text-[9px]">CANDLE HIGH</span>
              <span className="font-mono text-[9px] text-[#00e475]">MAX</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-base sm:text-lg font-bold text-[#00e475]">
                ${candleData.highPrice.toFixed(2)}
              </span>
              <span className="font-mono text-[9px] text-[#849495]">+360.20</span>
            </div>
          </div>

          <div className="bg-[#10131a] p-3 rounded-xl border border-[#1e293b] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#849495]">
              <span className="font-mono text-[9px]">CANDLE LOW</span>
              <span className="font-mono text-[9px] text-[#f7931a]">MIN</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-base sm:text-lg font-bold text-white">
                ${candleData.lowPrice.toFixed(2)}
              </span>
              <span className="font-mono text-[9px] text-[#849495]">-70.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace: Prediction Grid & Holographic Ticket Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 3-Step Selection Interface (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Step 1: Target Digit Specification */}
          <div className="bg-[#0b0e14] rounded-2xl border border-[#1e293b] p-4 sm:p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#1e293b]">
              <div className="flex flex-col">
                <span className="font-sans font-bold text-sm sm:text-base text-white tracking-wide">
                  1. TARGET DIGIT SPECIFICATION
                </span>
                <span className="font-sans text-xs text-[#849495]">
                  Forecast the terminal two integers of settlement candle metrics
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#00f2fe] bg-[#191c22] px-2 py-1 rounded border border-[#272a31] font-semibold">
                3-VECTOR PARLAY
              </span>
            </div>

            {/* 3 Modular Digit Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* OPEN Digits */}
              <div className="bg-[#10131a] p-3 rounded-xl border border-[#272a31] flex flex-col gap-2 group hover:border-[#00f2fe]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#00f2fe] tracking-wider uppercase font-semibold">
                    OPEN (D-1 & D-2)
                  </span>
                  <span className="font-mono text-[9px] text-[#849495]">TENS / UNITS</span>
                </div>

                <div className="flex items-center justify-center gap-2 py-1">
                  {/* Digit 1 */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => adjustDigit('open', 0, 1)}
                      className="w-10 h-6 bg-[#191c22] hover:bg-[#272a31] rounded text-[#849495] hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-12 h-14 bg-[#0b0e14] rounded-lg border border-[#272a31] flex items-center justify-center shadow-inner">
                      <span className="font-mono text-2xl font-bold text-[#00f2fe]">
                        {digits.open[0]}
                      </span>
                    </div>
                    <button
                      onClick={() => adjustDigit('open', 0, -1)}
                      className="w-10 h-6 bg-[#191c22] hover:bg-[#272a31] rounded text-[#849495] hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Digit 2 */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => adjustDigit('open', 1, 1)}
                      className="w-10 h-6 bg-[#191c22] hover:bg-[#272a31] rounded text-[#849495] hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-12 h-14 bg-[#0b0e14] rounded-lg border border-[#272a31] flex items-center justify-center shadow-inner">
                      <span className="font-mono text-2xl font-bold text-[#00f2fe]">
                        {digits.open[1]}
                      </span>
                    </div>
                    <button
                      onClick={() => adjustDigit('open', 1, -1)}
                      className="w-10 h-6 bg-[#191c22] hover:bg-[#272a31] rounded text-[#849495] hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1 border-t border-[#1e293b]">
                  <span className="font-mono text-[9px] text-[#849495]">QUICK:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setPair('open', 0, 0)}
                      className="px-1.5 py-0.5 rounded bg-[#191c22] text-[#849495] hover:text-white font-mono text-[9px]"
                    >
                      00
                    </button>
                    <button
                      onClick={() => setPair('open', 5, 0)}
                      className="px-1.5 py-0.5 rounded bg-[#191c22] text-[#849495] hover:text-white font-mono text-[9px]"
                    >
                      50
                    </button>
                    <button
                      onClick={() => setPair('open', 9, 9)}
                      className="px-1.5 py-0.5 rounded bg-[#191c22] text-[#849495] hover:text-white font-mono text-[9px]"
                    >
                      99
                    </button>
                  </div>
                </div>
              </div>

              {/* HIGH Digits */}
              <div className="bg-[#10131a] p-3 rounded-xl border border-[#272a31] flex flex-col gap-2 group hover:border-[#00e475]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#00e475] tracking-wider uppercase font-semibold">
                    HIGH (D-1 & D-2)
                  </span>
                  <span className="font-mono text-[9px] text-[#849495]">PEAK TARGET</span>
                </div>

                <div className="flex items-center justify-center gap-2 py-1">
                  {/* Digit 1 */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => adjustDigit('high', 0, 1)}
                      className="w-10 h-6 bg-[#191c22] hover:bg-[#272a31] rounded text-[#849495] hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-12 h-14 bg-[#0b0e14] rounded-lg border border-[#272a31] flex items-center justify-center shadow-inner">
                      <span className="font-mono text-2xl font-bold text-[#00e475]">
                        {digits.high[0]}
                      </span>
                    </div>
                    <button
                      onClick={() => adjustDigit('high', 0, -1)}
                      className="w-10 h-6 bg-[#191c22] hover:bg-[#272a31] rounded text-[#849495] hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Digit 2 */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => adjustDigit('high', 1, 1)}
                      className="w-10 h-6 bg-[#191c22] hover:bg-[#272a31] rounded text-[#849495] hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-12 h-14 bg-[#0b0e14] rounded-lg border border-[#272a31] flex items-center justify-center shadow-inner">
                      <span className="font-mono text-2xl font-bold text-[#00e475]">
                        {digits.high[1]}
                      </span>
                    </div>
                    <button
                      onClick={() => adjustDigit('high', 1, -1)}
                      className="w-10 h-6 bg-[#191c22] hover:bg-[#272a31] rounded text-[#849495] hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1 border-t border-[#1e293b]">
                  <span className="font-mono text-[9px] text-[#849495]">QUICK:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setPair('high', 2, 5)}
                      className="px-1.5 py-0.5 rounded bg-[#191c22] text-[#849495] hover:text-white font-mono text-[9px]"
                    >
                      25
                    </button>
                    <button
                      onClick={() => setPair('high', 7, 5)}
                      className="px-1.5 py-0.5 rounded bg-[#191c22] text-[#849495] hover:text-white font-mono text-[9px]"
                    >
                      75
                    </button>
                    <button
                      onClick={() => setPair('high', 8, 8)}
                      className="px-1.5 py-0.5 rounded bg-[#191c22] text-[#849495] hover:text-white font-mono text-[9px]"
                    >
                      88
                    </button>
                  </div>
                </div>
              </div>

              {/* CLOSE Digits */}
              <div className="bg-[#10131a] p-3 rounded-xl border border-[#272a31] flex flex-col gap-2 group hover:border-[#f7931a]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#f7931a] tracking-wider uppercase font-semibold">
                    CLOSE (D-1 & D-2)
                  </span>
                  <span className="font-mono text-[9px] text-[#849495]">SETTLEMENT</span>
                </div>

                <div className="flex items-center justify-center gap-2 py-1">
                  {/* Digit 1 */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => adjustDigit('close', 0, 1)}
                      className="w-10 h-6 bg-[#191c22] hover:bg-[#272a31] rounded text-[#849495] hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-12 h-14 bg-[#0b0e14] rounded-lg border border-[#272a31] flex items-center justify-center shadow-inner">
                      <span className="font-mono text-2xl font-bold text-[#f7931a]">
                        {digits.close[0]}
                      </span>
                    </div>
                    <button
                      onClick={() => adjustDigit('close', 0, -1)}
                      className="w-10 h-6 bg-[#191c22] hover:bg-[#272a31] rounded text-[#849495] hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Digit 2 */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => adjustDigit('close', 1, 1)}
                      className="w-10 h-6 bg-[#191c22] hover:bg-[#272a31] rounded text-[#849495] hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-12 h-14 bg-[#0b0e14] rounded-lg border border-[#272a31] flex items-center justify-center shadow-inner">
                      <span className="font-mono text-2xl font-bold text-[#f7931a]">
                        {digits.close[1]}
                      </span>
                    </div>
                    <button
                      onClick={() => adjustDigit('close', 1, -1)}
                      className="w-10 h-6 bg-[#191c22] hover:bg-[#272a31] rounded text-[#849495] hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1 border-t border-[#1e293b]">
                  <span className="font-mono text-[9px] text-[#849495]">QUICK:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setPair('close', 1, 2)}
                      className="px-1.5 py-0.5 rounded bg-[#191c22] text-[#849495] hover:text-white font-mono text-[9px]"
                    >
                      12
                    </button>
                    <button
                      onClick={() => setPair('close', 3, 3)}
                      className="px-1.5 py-0.5 rounded bg-[#191c22] text-[#849495] hover:text-white font-mono text-[9px]"
                    >
                      33
                    </button>
                    <button
                      onClick={() => setPair('close', 6, 9)}
                      className="px-1.5 py-0.5 rounded bg-[#191c22] text-[#849495] hover:text-white font-mono text-[9px]"
                    >
                      69
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Candle Direction Bias */}
          <div className="bg-[#0b0e14] rounded-2xl border border-[#1e293b] p-4 sm:p-6 shadow-xl flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-sans font-bold text-sm sm:text-base text-white tracking-wide">
                  2. CANDLE DIRECTION BIAS
                </span>
                <span className="font-sans text-xs text-[#849495]">
                  Select net delta vector at hourly timestamp resolution
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#849495] uppercase">
                MANDATORY MULTIPLIER LEG
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* BULL / GREEN */}
              <button
                onClick={() => setBias('BULL')}
                className={`relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all ${
                  bias === 'BULL'
                    ? 'bg-[#00e475]/15 border-[#00e475] text-[#00e475] shadow-[0_0_16px_rgba(0,228,117,0.25)] font-bold'
                    : 'bg-[#10131a] border-[#272a31] text-[#849495] hover:text-white hover:bg-[#191c22]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-base sm:text-lg">▲</span>
                  <span className="font-sans font-extrabold text-sm sm:text-base">BULL</span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#849495]">
                  CLOSE &gt; OPEN
                </span>
                {bias === 'BULL' && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00e475] shadow-[0_0_6px_#00e475]" />
                )}
              </button>

              {/* BEAR / RED */}
              <button
                onClick={() => setBias('BEAR')}
                className={`relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all ${
                  bias === 'BEAR'
                    ? 'bg-[#ff5252]/15 border-[#ff5252] text-[#ff5252] shadow-[0_0_16px_rgba(255,82,82,0.25)] font-bold'
                    : 'bg-[#10131a] border-[#272a31] text-[#849495] hover:text-white hover:bg-[#191c22]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-base sm:text-lg">▼</span>
                  <span className="font-sans font-extrabold text-sm sm:text-base">BEAR</span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#849495]">
                  CLOSE &lt; OPEN
                </span>
                {bias === 'BEAR' && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ff5252] shadow-[0_0_6px_#ff5252]" />
                )}
              </button>

              {/* DOJI / NEUTRAL */}
              <button
                onClick={() => setBias('DOJI')}
                className={`relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all ${
                  bias === 'DOJI'
                    ? 'bg-[#32353c] border-white text-white shadow-[0_0_16px_rgba(255,255,255,0.15)] font-bold'
                    : 'bg-[#10131a] border-[#272a31] text-[#849495] hover:text-white hover:bg-[#191c22]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-base sm:text-lg">▬</span>
                  <span className="font-sans font-extrabold text-sm sm:text-base">DOJI</span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#849495]">
                  CLOSE == OPEN
                </span>
                {bias === 'DOJI' && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white shadow-[0_0_6px_white]" />
                )}
              </button>
            </div>
          </div>

          {/* Step 3: Ticket Allocation & Multiplier */}
          <div className="bg-[#0b0e14] rounded-2xl border border-[#1e293b] p-4 sm:p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-sans font-bold text-sm sm:text-base text-white tracking-wide">
                  3. TICKET ALLOCATION & MULTIPLIER
                </span>
                <span className="font-sans text-xs text-[#849495]">
                  Base ticket unit: 10.00 USDT
                </span>
              </div>
              <span className="font-mono text-xs text-[#f7931a] font-semibold">
                MAX RETURN: 360x
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#10131a] p-3.5 rounded-xl border border-[#272a31]">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-[#849495] mr-1">LEVERAGE:</span>
                {[1, 5, 10, 25, 50].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMultiplier(m)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                      multiplier === m
                        ? 'bg-[#00f2fe] text-[#002022] shadow-[0_0_12px_rgba(0,242,254,0.3)]'
                        : 'bg-[#191c22] text-[#849495] hover:text-white border border-[#272a31]'
                    }`}
                  >
                    {m}x
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-6 ml-auto">
                <div className="flex flex-col text-right">
                  <span className="font-mono text-[9px] text-[#849495] uppercase">
                    TOTAL STAKE
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-white">
                    {totalStake.toFixed(2)} USDT
                  </span>
                </div>

                <div className="flex flex-col text-right">
                  <span className="font-mono text-[9px] text-[#f7931a] uppercase font-bold">
                    EST. JACKPOT RETURN
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#00e475]">
                    {estPayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Holographic NFT Ticket & Actions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4 sticky top-20">
          {/* Live Preview Ticket */}
          <DigitalTicketCard
            customDigits={digits}
            customBias={bias}
            customMultiplier={multiplier}
            customStake={totalStake}
            isInteractivePreview={true}
          />

          {/* Action CTAs */}
          <div className="flex flex-col gap-2.5">
            {/* Primary Mint Button */}
            <button
              onClick={handleMint}
              className="w-full py-3.5 rounded-xl bg-[#00f2fe] hover:bg-[#6ff6ff] text-[#002022] font-sans font-black text-sm uppercase tracking-wider transition-all shadow-[0_0_24px_rgba(0,242,254,0.4)] flex items-center justify-center gap-2 active:scale-98"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>CONFIRM & MINT TICKET ({totalStake.toFixed(2)} USDT)</span>
            </button>

            {/* Quick Randomizer Button */}
            <button
              onClick={randomizeAll}
              className="w-full py-2.5 rounded-lg bg-[#191c22] hover:bg-[#272a31] text-[#00f2fe] border border-[#272a31] font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2"
            >
              <Dices className="w-4 h-4" />
              <span>QUICK RANDOMIZE (LUCKY PICK)</span>
            </button>
          </div>

          {/* Smart Contract Escrow Chip */}
          <div className="bg-[#0b0e14] p-3 rounded-xl border border-[#1e293b] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-[#00e475] animate-pulse" />
              <span>SMART CONTRACT ESCROW</span>
            </div>
            <span className="text-[#849495] truncate">0x91cA...84E3</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Settled Epoch Registry & Winners */}
      <div className="bg-[#0b0e14] rounded-2xl border border-[#1e293b] p-4 sm:p-6 shadow-xl flex flex-col gap-4 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1e293b]">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#00f2fe]" />
            <h2 className="font-sans font-bold text-sm sm:text-base text-white">
              SETTLED EPOCH REGISTRY & WINNERS
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#849495]">
            LAST 3 CONFIRMED ORACLE ROUNDS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {roundHistory.map((item) => (
            <div
              key={item.round}
              className="bg-[#10131a] p-3 rounded-xl border border-[#272a31] flex flex-col gap-2 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-white">
                    ROUND #{item.round}
                  </span>
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      item.bias === 'BULL'
                        ? 'bg-[#00e475]/15 text-[#00e475]'
                        : 'bg-[#ff5252]/15 text-[#ff5252]'
                    }`}
                  >
                    {item.bias === 'BULL' ? 'BULL ▲' : 'BEAR ▼'}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[#849495]">
                  {item.timeUTC}
                </span>
              </div>

              <div className="flex items-center justify-around bg-[#0b0e14] p-2 rounded-lg font-mono text-xs border border-[#1e293b]">
                <span className="text-[#849495]">
                  OPEN: <strong className="text-white">{item.open}</strong>
                </span>
                <span className="text-[#849495]">
                  HIGH: <strong className="text-white">{item.high}</strong>
                </span>
                <span className="text-[#849495]">
                  CLOSE: <strong className="text-white">{item.close}</strong>
                </span>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <span className="font-mono text-[10px] text-[#849495]">
                  WINNER: {item.winner}
                </span>
                <span className="font-mono text-xs font-bold text-[#00e475]">
                  +{item.payout.toLocaleString()} USDT
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
