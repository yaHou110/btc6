'use client';

import React, { useState } from 'react';
import { useBTC6 } from '@/context/BTC6Context';
import { X, Copy, Check, ShieldCheck, AlertTriangle } from 'lucide-react';

export function DepositModal() {
  const { isDepositModalOpen, setIsDepositModalOpen, depositFunds } = useBTC6();
  const [selectedRail, setSelectedRail] = useState('TRC20');
  const [copied, setCopied] = useState(false);
  const [testAmount, setTestAmount] = useState('500');

  if (!isDepositModalOpen) return null;

  const custodyAddress = '0x71C694F90d8905Bf7a6A88F4b93D0E8120c9B76d';

  const handleCopy = () => {
    navigator.clipboard.writeText(custodyAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulatedDeposit = () => {
    const amt = parseFloat(testAmount);
    if (!isNaN(amt) && amt > 0) {
      depositFunds(amt, selectedRail);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0b0e14] border border-[#272a31] p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-5 cyan-glow">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#191c22] border border-[#00f2fe]/40 flex items-center justify-center text-[#00f2fe]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-base text-white tracking-wide">
                Institutional Inflow
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#849495]">
                VAULT LEDGER · CUSTODY MODULE
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsDepositModalOpen(false)}
            className="w-8 h-8 rounded-lg bg-[#191c22] hover:bg-[#272a31] text-[#849495] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Rail Selection */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] uppercase tracking-wider text-[#849495]">
            Select Settlement Rail
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'TRC20', name: 'TRC20 (Tron)', fee: '~1 USDT' },
              { id: 'ERC20', name: 'ERC20 (ETH)', fee: '~3.8 USDT' },
              { id: 'Arbitrum', name: 'Arbitrum One', fee: '~0.15 USDT' },
              { id: 'Lightning', name: 'Lightning (BTC)', fee: '<0.01 USDT' },
            ].map((rail) => (
              <button
                key={rail.id}
                onClick={() => setSelectedRail(rail.id)}
                className={`p-2 rounded-lg text-left font-mono transition-all border ${
                  selectedRail === rail.id
                    ? 'bg-[#191c22] text-[#00f2fe] border-[#00f2fe]/50 shadow-[0_0_12px_rgba(0,242,254,0.15)] font-bold'
                    : 'bg-[#10131a] text-[#849495] hover:text-white border-[#272a31]'
                }`}
              >
                <div className="text-xs truncate">{rail.name}</div>
                <div className="text-[9px] text-[#849495]">{rail.fee}</div>
              </button>
            ))}
          </div>
        </div>

        {/* QR Code & Address */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#10131a] p-4 rounded-xl border border-[#1e293b]">
          {/* Stylized QR SVG with 6 inside */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 bg-[#0b0e14] p-2.5 rounded-xl border border-[#272a31] shrink-0 flex items-center justify-center shadow-inner">
            <svg className="w-full h-full text-[#00f2fe]" viewBox="0 0 100 100" fill="currentColor">
              <rect x="5" y="5" width="26" height="26" rx="2" fill="currentColor" />
              <rect x="9" y="9" width="18" height="18" fill="#0b0e14" />
              <rect x="13" y="13" width="10" height="10" fill="currentColor" />
              <rect x="69" y="5" width="26" height="26" rx="2" fill="currentColor" />
              <rect x="73" y="9" width="18" height="18" fill="#0b0e14" />
              <rect x="77" y="13" width="10" height="10" fill="currentColor" />
              <rect x="5" y="69" width="26" height="26" rx="2" fill="currentColor" />
              <rect x="9" y="73" width="18" height="18" fill="#0b0e14" />
              <rect x="13" y="77" width="10" height="10" fill="currentColor" />
              <circle cx="40" cy="15" r="3" />
              <circle cx="50" cy="12" r="2.5" />
              <circle cx="58" cy="20" r="3.5" />
              <circle cx="42" cy="30" r="2" />
              <circle cx="52" cy="38" r="3" />
              <circle cx="20" cy="45" r="2" />
              <circle cx="30" cy="52" r="3.5" />
              <circle cx="48" cy="55" r="2.5" />
              <circle cx="68" cy="45" r="3" />
              <circle cx="85" cy="42" r="2" />
              <circle cx="75" cy="58" r="3" />
              <circle cx="88" cy="62" r="2.5" />
              <circle cx="45" cy="72" r="3.5" />
              <circle cx="58" cy="80" r="2" />
              <circle cx="70" cy="75" r="3" />
              <circle cx="85" cy="85" r="3" />
              <circle cx="38" cy="88" r="2" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-[#0b0e14] border border-[#00f2fe] flex items-center justify-center font-mono font-bold text-sm text-[#00f2fe]">
                6
              </div>
            </div>
          </div>

          {/* Dedicated Address Field & Copy */}
          <div className="flex flex-col gap-2.5 w-full min-w-0">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#849495]">
              Dedicated Custody Address ({selectedRail})
            </span>
            <div className="flex items-center gap-1.5 bg-[#0b0e14] p-2 rounded-lg border border-[#272a31]">
              <input
                readOnly
                value={custodyAddress}
                className="bg-transparent font-mono text-[11px] text-white w-full outline-none select-all truncate"
              />
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded bg-[#00f2fe] text-[#002022] font-mono text-[10px] font-bold uppercase flex items-center gap-1 shrink-0 hover:bg-[#6ff6ff] transition-all"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="flex flex-col gap-1 text-[11px] font-mono text-[#849495]">
              <div className="flex justify-between">
                <span>Minimum Settlement:</span>
                <span className="text-white font-semibold">10.00 USDT</span>
              </div>
              <div className="flex justify-between">
                <span>Confirmations:</span>
                <span className="text-white font-semibold">12 Cycles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Callout */}
        <div className="flex items-start gap-2 bg-[#191c22] p-2.5 rounded-lg border border-[#272a31] text-[11px] font-sans text-[#b9cacb]">
          <AlertTriangle className="w-4 h-4 text-[#f7931a] shrink-0 mt-0.5" />
          <span>
            Send only USDT to this address on the <strong className="text-white">{selectedRail}</strong> rail. Submissions via mismatched protocol cannot be re-routed.
          </span>
        </div>

        {/* Instant Sandbox Crediting for Testing */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1e293b] gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#849495]">TEST DEPOSIT:</span>
            {['100', '500', '1000'].map((amt) => (
              <button
                key={amt}
                onClick={() => setTestAmount(amt)}
                className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                  testAmount === amt
                    ? 'bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]'
                    : 'bg-[#191c22] text-[#849495]'
                }`}
              >
                {amt}
              </button>
            ))}
          </div>

          <button
            onClick={handleSimulatedDeposit}
            className="px-4 py-2 rounded-lg bg-[#00f2fe] hover:bg-[#6ff6ff] text-[#002022] font-mono text-xs font-bold uppercase transition-all shadow-[0_0_16px_rgba(0,242,254,0.35)]"
          >
            Credit +{testAmount} USDT
          </button>
        </div>
      </div>
    </div>
  );
}
