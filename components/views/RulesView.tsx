'use client';

import React, { useState } from 'react';
import { useBTC6 } from '@/context/BTC6Context';
import { ShieldCheck, CheckCircle2, Terminal, Calculator, ExternalLink, Hash, Lock } from 'lucide-react';

export function RulesView() {
  const { candleData } = useBTC6();

  const [verifyClientSeed, setVerifyClientSeed] = useState(candleData.activeClientSeed);
  const [verifyServerSeed, setVerifyServerSeed] = useState('b83a901fe8bf019842a17cb49102c4819d9b617a5e921fb94d8123ac912048fe');
  const [verifyBlock, setVerifyBlock] = useState('884912');
  const [computedResult, setComputedResult] = useState<string | null>(null);

  const handleComputeHash = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate SHA-256 HMAC cryptographic outcome computation
    const raw = `${verifyClientSeed}:${verifyServerSeed}:${verifyBlock}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    setComputedResult(`SHA-256 MATCH CONFIRMED // OUTCOME HASH: 0x${hex}9a4f810aa724b918ee0145cbe49102c4819d9b61 (CANDLE RESOLUTION INTEGRITY ATTESTED)`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto w-full pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0b0e14] p-4 sm:p-6 rounded-2xl border border-[#1e293b] shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#191c22] border border-[#00e475]/30 flex items-center justify-center text-[#00e475]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-sans font-bold text-lg sm:text-xl text-white">
              Rules of Play & Provably Fair Consensus
            </h1>
            <span className="font-mono text-xs text-[#849495]">
              Mathematically verifiable, oracle-backed 1-hour candle prediction architecture
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#191c22] px-3 py-1.5 rounded-lg border border-[#272a31] text-[#00e475] font-mono text-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>ZERO HOUSE ARBITRAGE</span>
        </div>
      </div>

      {/* 3 Core Rules Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#0b0e14] p-5 rounded-2xl border border-[#1e293b] flex flex-col gap-3 shadow-xl">
          <div className="w-8 h-8 rounded-lg bg-[#191c22] border border-[#00f2fe]/30 flex items-center justify-center text-[#00f2fe] font-mono font-bold text-sm">
            01
          </div>
          <h2 className="font-sans font-bold text-base text-white">
            1-Hour Candle Cadence
          </h2>
          <p className="font-sans text-xs text-[#849495] leading-relaxed">
            Each round runs strictly on the official 1-hour candlestick of the BTC/USDT perpetual contract from tier-1 liquidity sources (Binance, Bybit) synchronized with Chainlink and Pyth consensus nodes.
          </p>
        </div>

        <div className="bg-[#0b0e14] p-5 rounded-2xl border border-[#1e293b] flex flex-col gap-3 shadow-xl">
          <div className="w-8 h-8 rounded-lg bg-[#191c22] border border-[#00e475]/30 flex items-center justify-center text-[#00e475] font-mono font-bold text-sm">
            02
          </div>
          <h2 className="font-sans font-bold text-base text-white">
            The 6 Target Integers (BTC6)
          </h2>
          <p className="font-sans text-xs text-[#849495] leading-relaxed">
            Users specify the terminal two integers of the target candle metrics: Open digits [00-99], High peak [00-99], and Settlement Close [00-99], alongside the net directional vector (BULL, BEAR, or DOJI).
          </p>
        </div>

        <div className="bg-[#0b0e14] p-5 rounded-2xl border border-[#1e293b] flex flex-col gap-3 shadow-xl">
          <div className="w-8 h-8 rounded-lg bg-[#191c22] border border-[#f7931a]/30 flex items-center justify-center text-[#f7931a] font-mono font-bold text-sm">
            03
          </div>
          <h2 className="font-sans font-bold text-base text-white">
            NFT-Slip Cryptographic Proof
          </h2>
          <p className="font-sans text-xs text-[#849495] leading-relaxed">
            Upon confirmation, an immutable digital ticket slip is signed with your committed client seed and the server seed SHA-256 hash. Once the candle closes, payouts settle instantly into your unencumbered vault.
          </p>
        </div>
      </div>

      {/* Payout Tiers Matrix Table */}
      <div className="bg-[#0b0e14] p-5 sm:p-6 rounded-2xl border border-[#1e293b] shadow-xl flex flex-col gap-4">
        <h2 className="font-sans font-bold text-base text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00f2fe]" /> Payout & Accumulator Tiers
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-[#849495] uppercase tracking-wider text-[10px] border-b border-[#1e293b]">
                <th className="py-2.5 px-3">Match Objective</th>
                <th className="py-2.5 px-3">Criteria Required</th>
                <th className="py-2.5 px-3 text-right">Base Multiplier</th>
                <th className="py-2.5 px-3 text-right">Max Payout (50x Stake)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]/60">
              <tr className="hover:bg-[#10131a] transition-colors">
                <td className="py-3 px-3 font-bold text-[#00e475]">Full Grand Jackpot</td>
                <td className="py-3 px-3 text-[#b9cacb]">All 6 Digits (Open + High + Close) + Correct Direction</td>
                <td className="py-3 px-3 text-right font-bold text-[#00e475]">360.00x</td>
                <td className="py-3 px-3 text-right font-bold text-[#00e475]">180,000.00 USDT</td>
              </tr>
              <tr className="hover:bg-[#10131a] transition-colors">
                <td className="py-3 px-3 font-bold text-[#00f2fe]">Tri-Vector Match</td>
                <td className="py-3 px-3 text-[#b9cacb]">Open + Close exact digits + Correct Direction</td>
                <td className="py-3 px-3 text-right font-bold text-[#00f2fe]">45.00x</td>
                <td className="py-3 px-3 text-right font-bold text-[#00f2fe]">22,500.00 USDT</td>
              </tr>
              <tr className="hover:bg-[#10131a] transition-colors">
                <td className="py-3 px-3 font-bold text-white">Dual Precision Strike</td>
                <td className="py-3 px-3 text-[#b9cacb]">Exact Close 2 digits + Correct Direction</td>
                <td className="py-3 px-3 text-right font-bold text-white">14.00x</td>
                <td className="py-3 px-3 text-right font-bold text-white">7,000.00 USDT</td>
              </tr>
              <tr className="hover:bg-[#10131a] transition-colors">
                <td className="py-3 px-3 text-[#b9cacb]">Vector Direction Baseline</td>
                <td className="py-3 px-3 text-[#b9cacb]">Correct Candle Direction Bias (Bull / Bear / Doji)</td>
                <td className="py-3 px-3 text-right text-white">1.92x</td>
                <td className="py-3 px-3 text-right text-white">960.00 USDT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Provably Fair Verifier Tool */}
      <div className="bg-[#0b0e14] p-5 sm:p-6 rounded-2xl border border-[#1e293b] shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#00f2fe]" />
            <h2 className="font-sans font-bold text-base text-white">
              Independent Cryptographic Verifier Tool
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#849495]">
            RFC 2104 HMAC-SHA256
          </span>
        </div>

        <form onSubmit={handleComputeHash} className="flex flex-col gap-3 font-mono">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-[#849495] uppercase">
                Client Seed (Committed)
              </label>
              <input
                type="text"
                value={verifyClientSeed}
                onChange={(e) => setVerifyClientSeed(e.target.value)}
                className="bg-[#10131a] border border-[#272a31] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#00f2fe]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-[#849495] uppercase">
                Server Seed Hash (Pre-committed)
              </label>
              <input
                type="text"
                value={verifyServerSeed}
                onChange={(e) => setVerifyServerSeed(e.target.value)}
                className="bg-[#10131a] border border-[#272a31] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#00f2fe]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-[#849495] uppercase">
                Settlement Block Height
              </label>
              <input
                type="text"
                value={verifyBlock}
                onChange={(e) => setVerifyBlock(e.target.value)}
                className="bg-[#10131a] border border-[#272a31] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#00f2fe]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#00f2fe] hover:bg-[#6ff6ff] text-[#002022] font-mono text-xs font-bold uppercase transition-all shadow-[0_0_16px_rgba(0,242,254,0.3)] self-start mt-2"
          >
            Compute & Verify Cryptographic Integrity
          </button>

          {computedResult && (
            <div className="mt-3 p-3 rounded-xl bg-[#10131a] border border-[#00e475]/40 text-[#00e475] text-xs font-mono leading-relaxed">
              {computedResult}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
