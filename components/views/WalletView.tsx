'use client';

import React, { useState } from 'react';
import { useBTC6 } from '@/context/BTC6Context';
import { TransactionType } from '@/types';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  ShieldCheck,
  Lock,
  Copy,
  Check,
  AlertTriangle,
  Award,
  Layers,
  Fuel,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export function WalletView() {
  const {
    walletBalance,
    lockedInRounds,
    unclaimedSettlement,
    claimSettlement,
    transactions,
    depositFunds,
    withdrawFunds,
    setIsDepositModalOpen,
    showToast,
  } = useBTC6();

  // Tab state within wallet
  const [activeActionTab, setActiveActionTab] = useState<'deposit' | 'withdraw' | 'swap'>('deposit');
  const [selectedRail, setSelectedRail] = useState('TRC20');
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Withdraw state
  const [withdrawAmount, setWithdrawAmount] = useState('1000');
  const [selectedEnclave, setSelectedEnclave] = useState('0x882A...770C (Arbitrum)');

  // Swap state
  const [swapBtcAmount, setSwapBtcAmount] = useState('0.1');

  // Ledger Filter State
  const [ledgerFilter, setLedgerFilter] = useState<'ALL' | TransactionType>('ALL');
  const [ledgerPage, setLedgerPage] = useState(1);

  const custodyAddress = '0x71C694F90d8905Bf7a6A88F4bA1C90e03D1488F4';

  const handleCopy = () => {
    navigator.clipboard.writeText(custodyAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(withdrawAmount);
    if (isNaN(amt) || amt <= 0) {
      showToast('Invalid Amount', 'Please enter a valid amount to withdraw.', 'warn');
      return;
    }
    withdrawFunds(amt, selectedEnclave);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (ledgerFilter === 'ALL') return true;
    return tx.type === ledgerFilter;
  });

  return (
    <div className="flex flex-col gap-6 max-w-[1720px] mx-auto w-full pb-12">
      {/* Top Banner: Custody Protocol Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-[#00f2fe] tracking-widest uppercase">
              VAULT LEDGER // CUSTODY MODULE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e475]" />
            <span className="font-mono text-[9px] text-[#849495] tracking-wider">
              NETWORK: MAINNET-SECURE
            </span>
          </div>
          <h1 className="font-sans font-extrabold text-xl sm:text-2xl text-white tracking-tight">
            Institutional Multi-Sig Wallet
          </h1>
        </div>

        <div className="flex items-center gap-3 bg-[#0b0e14] px-4 py-2 rounded-xl border border-[#1e293b] shadow-md">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00e475] animate-ping" />
          <div className="flex flex-col">
            <span className="font-mono text-[8px] text-[#849495] uppercase">Security Protocol</span>
            <span className="font-mono text-xs text-[#00e475] font-bold flex items-center gap-1">
              LEVEL 3 // HSM COLD-STORAGE ENCLAVE
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* 4 Financial Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Available Balance */}
        <div className="bg-[#0b0e14] p-4 sm:p-5 rounded-2xl border border-[#1e293b] flex flex-col justify-between shadow-xl gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#849495] uppercase tracking-wider font-semibold">
              Total Available Balance
            </span>
            <Wallet className="w-4 h-4 text-[#849495]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                {walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="font-mono text-xs font-bold text-[#00f2fe]">USDT</span>
            </div>
            <span className="font-mono text-[11px] text-[#849495] mt-0.5">
              ≈ {(walletBalance / 64281.5).toFixed(4)} BTC · ${walletBalance.toLocaleString()} USD
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#00e475] font-mono text-[11px] pt-2 border-t border-[#1e293b]">
            <Check className="w-3.5 h-3.5" />
            <span>100% Unencumbered Capital</span>
          </div>
        </div>

        {/* Card 2: Locked Active */}
        <div className="bg-[#0b0e14] p-4 sm:p-5 rounded-2xl border border-[#1e293b] flex flex-col justify-between shadow-xl gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#849495] uppercase tracking-wider font-semibold">
              Locked in Active Rounds
            </span>
            <Lock className="w-4 h-4 text-[#f7931a]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#f7931a]">
                {lockedInRounds.toFixed(2)}
              </span>
              <span className="font-mono text-xs font-bold text-[#849495]">USDT</span>
            </div>
            <span className="font-mono text-[11px] text-[#849495] mt-0.5">
              Committed to Round #1400 in orbit
            </span>
          </div>

          <div className="flex items-center justify-between font-mono text-[10px] pt-2 border-t border-[#1e293b]">
            <span className="text-[#849495]">ESCROW PROTOCOL</span>
            <span className="text-[#f7931a] font-semibold">ROUND CLOSES IN 18m</span>
          </div>
        </div>

        {/* Card 3: Unclaimed Settlement */}
        <div className="bg-[#0b0e14] p-4 sm:p-5 rounded-2xl border border-[#1e293b] flex flex-col justify-between shadow-xl gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#00e475] uppercase tracking-wider font-bold">
              Unclaimed Settlement
            </span>
            <Award className="w-4 h-4 text-[#00e475]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#00e475]">
                +{unclaimedSettlement.toFixed(2)}
              </span>
              <span className="font-mono text-xs font-bold text-[#00e475]">USDT</span>
            </div>
            <span className="font-mono text-[11px] text-[#849495] mt-0.5">
              Won Candle Match · Batch #4419A
            </span>
          </div>

          <div className="pt-2 border-t border-[#1e293b]">
            <button
              onClick={() => claimSettlement()}
              disabled={unclaimedSettlement <= 0}
              className={`w-full py-1.5 rounded-lg font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 ${
                unclaimedSettlement > 0
                  ? 'bg-[#00f2fe] hover:bg-[#6ff6ff] text-[#002022] shadow-[0_0_14px_rgba(0,242,254,0.35)]'
                  : 'bg-[#191c22] text-[#849495] cursor-not-allowed'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>CLAIM ALL TO WALLET</span>
            </button>
          </div>
        </div>

        {/* Card 4: 24h Settlement Limit */}
        <div className="bg-[#0b0e14] p-4 sm:p-5 rounded-2xl border border-[#1e293b] flex flex-col justify-between shadow-xl gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#849495] uppercase tracking-wider font-semibold">
              24h Settlement Limit
            </span>
            <TrendingUp className="w-4 h-4 text-[#849495]" />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between font-mono">
              <span className="text-xl sm:text-2xl font-bold text-white">87,550.00</span>
              <span className="text-xs text-[#849495]">/ 100,000 USDT</span>
            </div>
            <div className="w-full bg-[#191c22] h-2 rounded-full overflow-hidden">
              <div className="bg-[#00f2fe] h-full rounded-full" style={{ width: '87.55%' }} />
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[10px] text-[#849495] pt-2 border-t border-[#1e293b]">
            <span>Tier 3 Daily Ceiling</span>
            <span className="text-[#00f2fe] font-bold">87.5% AVAILABLE</span>
          </div>
        </div>
      </div>

      {/* Action Center Grid: Action Tabs (7 cols) & Whitelist Enclaves (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Action Box (7 cols) */}
        <div className="lg:col-span-7 bg-[#0b0e14] p-4 sm:p-6 rounded-2xl border border-[#1e293b] shadow-xl flex flex-col gap-5">
          {/* Action Tabs Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1e293b]">
            <div className="flex items-center gap-1 bg-[#10131a] p-1 rounded-xl border border-[#272a31]">
              <button
                onClick={() => setActiveActionTab('deposit')}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeActionTab === 'deposit'
                    ? 'bg-[#191c22] text-[#00f2fe] border border-[#00f2fe]/40 shadow-sm'
                    : 'text-[#849495] hover:text-white'
                }`}
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>DEPOSIT (USDT / BTC)</span>
              </button>

              <button
                onClick={() => setActiveActionTab('withdraw')}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeActionTab === 'withdraw'
                    ? 'bg-[#191c22] text-[#00f2fe] border border-[#00f2fe]/40 shadow-sm'
                    : 'text-[#849495] hover:text-white'
                }`}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>WITHDRAW</span>
              </button>

              <button
                onClick={() => setActiveActionTab('swap')}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeActionTab === 'swap'
                    ? 'bg-[#191c22] text-[#00f2fe] border border-[#00f2fe]/40 shadow-sm'
                    : 'text-[#849495] hover:text-white'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>INSTANT SWAP</span>
              </button>
            </div>

            <span className="font-mono text-[10px] text-[#00e475] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> SegWit & Taproot Ready
            </span>
          </div>

          {/* Tab 1: Deposit View */}
          {activeActionTab === 'deposit' && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] text-[#849495] uppercase tracking-wider">
                  Select Settlement Rail
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'TRC20', name: 'TRC20 (Tron)', fee: '~1 USDT · 2m' },
                    { id: 'ERC20', name: 'ERC20 (ETH)', fee: '~3.8 USDT · 4m' },
                    { id: 'Arbitrum', name: 'Arbitrum One', fee: '~0.15 USDT · 15s' },
                    { id: 'Lightning', name: 'Lightning (BTC)', fee: '<0.01 USDT · 1s' },
                  ].map((rail) => (
                    <button
                      key={rail.id}
                      onClick={() => setSelectedRail(rail.id)}
                      className={`p-2.5 rounded-xl text-left font-mono transition-all border ${
                        selectedRail === rail.id
                          ? 'bg-[#191c22] text-[#00f2fe] border-[#00f2fe]/40 shadow-[0_0_12px_rgba(0,242,254,0.15)] font-bold'
                          : 'bg-[#10131a] text-[#849495] hover:text-white border-[#272a31]'
                      }`}
                    >
                      <span className="text-xs block">{rail.name}</span>
                      <span className="text-[9px] text-[#849495]">{rail.fee}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* QR and Address Card */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#10131a] p-4 rounded-xl border border-[#272a31]">
                {/* QR Visual */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 bg-[#0b0e14] rounded-xl border border-[#1e293b]">
                  <div className="relative w-36 h-36 bg-[#10131a] p-2.5 rounded-lg border border-[#272a31] flex items-center justify-center">
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
                  <span className="font-mono text-[9px] text-[#849495] mt-2 uppercase tracking-wider">
                    SCAN TO DEPOSIT {selectedRail}
                  </span>
                </div>

                {/* Address Info */}
                <div className="sm:col-span-7 flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#849495]">
                      Dedicated Vault Custody Address
                    </span>
                    <div className="flex items-center gap-1.5 bg-[#0b0e14] p-2 rounded-lg border border-[#272a31]">
                      <input
                        readOnly
                        value={custodyAddress}
                        className="bg-transparent font-mono text-[11px] text-[#00f2fe] w-full outline-none select-all truncate font-semibold"
                      />
                      <button
                        onClick={handleCopy}
                        className="p-1.5 rounded bg-[#191c22] hover:bg-[#272a31] text-[#00f2fe] transition-colors"
                      >
                        {copiedAddress ? <Check className="w-3.5 h-3.5 text-[#00e475]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 text-[11px] font-mono text-[#849495]">
                    <div className="flex justify-between">
                      <span>Minimum Settlement:</span>
                      <span className="text-white font-semibold">10.00 USDT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Required Confirmations:</span>
                      <span className="text-white font-semibold">12 Network Blocks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Crediting Latency:</span>
                      <span className="text-[#00e475] font-semibold">&lt; 90 Seconds</span>
                    </div>
                  </div>

                  <div className="bg-[#0b0e14] p-2 rounded-lg border border-[#272a31] flex items-center gap-2 text-[#f7931a]">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span className="font-mono text-[9px] leading-relaxed">
                      Send only USDT on {selectedRail}. Cross-chain mismatches cannot be automatically recovered.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Withdraw View */}
          {activeActionTab === 'withdraw' && (
            <form onSubmit={handleWithdrawSubmit} className="flex flex-col gap-4">
              <div className="bg-[#10131a] p-4 rounded-xl border border-[#272a31] flex flex-col gap-3">
                <span className="font-mono text-[10px] text-[#849495] uppercase tracking-wider">
                  Fast Route Withdrawal
                </span>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] text-[#849495]">
                    Recipient Whitelisted Enclave Target
                  </label>
                  <select
                    value={selectedEnclave}
                    onChange={(e) => setSelectedEnclave(e.target.value)}
                    className="bg-[#0b0e14] border border-[#272a31] rounded-lg p-2.5 font-mono text-xs text-white focus:outline-none focus:border-[#00f2fe]"
                  >
                    <option value="0x882A...770C (Arbitrum)">
                      Institutional Prime Safe · 0x882A...770C (Arbitrum)
                    </option>
                    <option value="bc1qxy2kgdy...k94v (Bitcoin Taproot)">
                      Corporate Treasury Safe · bc1qxy2kgdy...k94v (BTC)
                    </option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-[#849495]">Withdrawal Sum (USDT)</span>
                    <span className="text-[#849495]">Avail: {walletBalance.toFixed(2)} USDT</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#0b0e14] p-2 rounded-lg border border-[#272a31]">
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="bg-transparent font-mono text-sm sm:text-base font-bold text-[#00f2fe] w-full outline-none"
                      placeholder="0.00"
                    />
                    <button
                      type="button"
                      onClick={() => setWithdrawAmount(walletBalance.toString())}
                      className="px-2 py-1 rounded bg-[#191c22] text-[#00f2fe] font-mono text-[10px] font-bold"
                    >
                      MAX
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3 rounded-xl bg-[#00f2fe] hover:bg-[#6ff6ff] text-[#002022] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_16px_rgba(0,242,254,0.35)] flex items-center justify-center gap-2 active:scale-98"
                >
                  <Lock className="w-4 h-4" />
                  <span>EXECUTE MULTI-SIG WITHDRAWAL</span>
                </button>
              </div>
            </form>
          )}

          {/* Tab 3: Instant Swap */}
          {activeActionTab === 'swap' && (
            <div className="bg-[#10131a] p-5 rounded-xl border border-[#272a31] flex flex-col gap-4 text-center">
              <RefreshCw className="w-8 h-8 text-[#00f2fe] mx-auto animate-spin-slow" />
              <div className="flex flex-col gap-1">
                <span className="font-sans font-bold text-base text-white">
                  Zero-Slippage Atomic Swaps
                </span>
                <p className="font-sans text-xs text-[#849495] max-w-md mx-auto">
                  Convert spot Bitcoin (BTC) directly to USDT liquidity for prediction contracts with on-chain cryptographic settlement.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 bg-[#0b0e14] p-3 rounded-xl border border-[#1e293b] font-mono text-xs text-[#00f2fe]">
                <span>1 BTC = 64,281.50 USDT</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                <div className="flex items-center gap-2 bg-[#0b0e14] px-3 py-2 rounded-lg border border-[#272a31]">
                  <input
                    type="number"
                    value={swapBtcAmount}
                    onChange={(e) => setSwapBtcAmount(e.target.value)}
                    className="w-20 bg-transparent font-mono text-sm font-bold text-white text-center outline-none"
                  />
                  <span className="font-mono text-xs text-[#f7931a] font-bold">BTC</span>
                </div>
                <span className="text-[#849495]">➔</span>
                <div className="bg-[#0b0e14] px-4 py-2 rounded-lg border border-[#272a31] font-mono text-sm font-bold text-[#00e475]">
                  {(parseFloat(swapBtcAmount || '0') * 64281.5).toFixed(2)} USDT
                </div>
              </div>

              <button
                onClick={() => {
                  depositFunds(parseFloat(swapBtcAmount || '0') * 64281.5, 'Atomic BTC Swap');
                }}
                className="w-full py-2.5 rounded-xl bg-[#00f2fe] hover:bg-[#6ff6ff] text-[#002022] font-mono text-xs font-bold uppercase transition-all shadow-[0_0_16px_rgba(0,242,254,0.3)]"
              >
                Execute Atomic Swap
              </button>
            </div>
          )}
        </div>

        {/* Right Info Box (5 cols): Whitelisted Wallets & Gas Telemetry */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Whitelisted Wallets Card */}
          <div className="bg-[#0b0e14] p-4 sm:p-5 rounded-2xl border border-[#1e293b] shadow-xl flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00f2fe]" />
                <span className="font-sans font-bold text-sm text-white">
                  Whitelisted Enclaves
                </span>
              </div>
              <button
                onClick={() => showToast('Multisig Whitelist', 'New enclave proposal requires 3 of 5 admin signatures.', 'info')}
                className="font-mono text-[9px] text-[#00f2fe] hover:underline uppercase"
              >
                + ADD NEW
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <div className="bg-[#10131a] p-3 rounded-xl border border-[#272a31] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#191c22] border border-[#272a31] flex items-center justify-center text-[#00f2fe]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-xs text-white">
                      Institutional Cold Enclave A
                    </span>
                    <span className="font-mono text-[10px] text-[#849495]">
                      0x882A...770C (Arbitrum)
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[9px] bg-[#191c22] text-[#00e475] px-2 py-0.5 rounded border border-[#272a31] font-bold">
                  ACTIVE
                </span>
              </div>

              <div className="bg-[#10131a] p-3 rounded-xl border border-[#272a31] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#191c22] border border-[#272a31] flex items-center justify-center text-[#f7931a]">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-xs text-white">
                      Corporate Treasury Safe
                    </span>
                    <span className="font-mono text-[10px] text-[#849495]">
                      bc1qxy2kgdygjrsqtz...k94v
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[9px] bg-[#191c22] text-[#00e475] px-2 py-0.5 rounded border border-[#272a31] font-bold">
                  ACTIVE
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#10131a] rounded-xl border border-[#1e293b] flex flex-col gap-1 font-mono text-[10px]">
              <div className="flex justify-between text-[#849495]">
                <span>Whitelist Lock Period:</span>
                <span className="text-white">48h Delay for newly added targets</span>
              </div>
              <div className="flex justify-between text-[#849495]">
                <span>Multi-Sig Signers:</span>
                <span className="text-[#00e475] font-bold">3 of 5 Keys Required</span>
              </div>
            </div>
          </div>

          {/* Real-time Gas & Network Telemetry */}
          <div className="bg-[#0b0e14] p-4 sm:p-5 rounded-2xl border border-[#1e293b] shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-sans font-bold text-sm text-white flex items-center gap-2">
                <Fuel className="w-4 h-4 text-[#f7931a]" /> Real-Time Gas & Network Telemetry
              </span>
              <span className="font-mono text-[9px] text-[#849495]">LATENCY: 14MS</span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="bg-[#10131a] p-2.5 rounded-xl border border-[#272a31] text-center flex flex-col font-mono">
                <span className="text-[9px] text-[#849495]">TRON SPEED</span>
                <span className="text-sm font-bold text-[#00e475] my-0.5">1.2s</span>
                <span className="text-[9px] text-[#849495]">~1.0 USDT</span>
              </div>

              <div className="bg-[#10131a] p-2.5 rounded-xl border border-[#272a31] text-center flex flex-col font-mono">
                <span className="text-[9px] text-[#849495]">ETH GWEI</span>
                <span className="text-sm font-bold text-[#f7931a] my-0.5">14 Gwei</span>
                <span className="text-[9px] text-[#849495]">~3.8 USDT</span>
              </div>

              <div className="bg-[#10131a] p-2.5 rounded-xl border border-[#272a31] text-center flex flex-col font-mono">
                <span className="text-[9px] text-[#849495]">ARBITRUM</span>
                <span className="text-sm font-bold text-[#00f2fe] my-0.5">0.1 Gwei</span>
                <span className="text-[9px] text-[#849495]">0.15 USDT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Audit & Transaction Ledger */}
      <div className="bg-[#0b0e14] p-4 sm:p-6 rounded-2xl border border-[#1e293b] shadow-xl flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-[#1e293b]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#191c22] border border-[#272a31] flex items-center justify-center text-[#00f2fe]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-sans font-bold text-base text-white">
                Financial Audit & Transaction Ledger
              </h2>
              <span className="font-mono text-[9px] text-[#849495]">
                CHAIN-ANCHORED RECORD VERIFICATION
              </span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-[#10131a] p-1 rounded-xl border border-[#272a31] overflow-x-auto max-w-full">
            {[
              { id: 'ALL', label: 'All Transactions' },
              { id: 'DEPOSIT', label: 'Deposits' },
              { id: 'JACKPOT_PAYOUT', label: 'Jackpot Payouts' },
              { id: 'TICKET_PURCHASE', label: 'Ticket Purchases' },
              { id: 'WITHDRAWAL', label: 'Withdrawals' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setLedgerFilter(f.id as any)}
                className={`px-3 py-1 rounded-lg font-mono text-[11px] font-semibold transition-all whitespace-nowrap ${
                  ledgerFilter === f.id
                    ? 'bg-[#191c22] text-[#00f2fe] border border-[#00f2fe]/40'
                    : 'text-[#849495] hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-[#849495] uppercase tracking-wider text-[10px] border-b border-[#1e293b]">
                <th className="py-3 px-3">Time (UTC)</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Routing / Target</th>
                <th className="py-3 px-3 text-right">Amount (USDT)</th>
                <th className="py-3 px-3">Verification State</th>
                <th className="py-3 px-3 text-right">Tx Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]/60">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#10131a] transition-colors">
                  <td className="py-3 px-3 text-[#b9cacb] whitespace-nowrap">{tx.timeUTC}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded text-[10px] ${
                        tx.amount > 0
                          ? 'bg-[#00e475]/15 text-[#00e475]'
                          : 'bg-[#191c22] text-[#849495]'
                      }`}
                    >
                      {tx.title}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#b9cacb]">{tx.routing}</td>
                  <td
                    className={`py-3 px-3 text-right font-bold text-sm whitespace-nowrap ${
                      tx.amount > 0 ? 'text-[#00e475]' : 'text-white'
                    }`}
                  >
                    {tx.amount > 0 ? `+${tx.amount.toFixed(2)}` : tx.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-[#00e475] text-[10px] whitespace-nowrap">
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" /> {tx.verificationState}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <span className="text-[#00f2fe] hover:underline inline-flex items-center gap-1 cursor-pointer">
                      {tx.txHash}
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ledger Pagination Bar */}
        <div className="flex items-center justify-between pt-2 text-[#849495] font-mono text-[10px] border-t border-[#1e293b]">
          <span>SHOWING {filteredTransactions.length} OF 1,489 CRYPTOGRAPHIC AUDIT ENTRIES</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLedgerPage(Math.max(1, ledgerPage - 1))}
              className="px-2.5 py-1 bg-[#10131a] hover:bg-[#191c22] rounded border border-[#272a31] text-white flex items-center gap-1"
            >
              <ChevronLeft className="w-3 h-3" /> PREV
            </button>
            <span className="text-[#00f2fe] font-bold">{ledgerPage} / 249</span>
            <button
              onClick={() => setLedgerPage(ledgerPage + 1)}
              className="px-2.5 py-1 bg-[#10131a] hover:bg-[#191c22] rounded border border-[#272a31] text-white flex items-center gap-1"
            >
              NEXT <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
