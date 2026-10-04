'use client';

import React, { useState } from 'react';
import { useBTC6 } from '@/context/BTC6Context';
import {
  Timer,
  TrendingUp,
  Volume2,
  VolumeX,
  Bell,
  Wifi,
  ShieldCheck,
  X,
  CheckCircle2,
} from 'lucide-react';

export function Header() {
  const {
    walletBalance,
    candleData,
    setIsDepositModalOpen,
    audioEnabled,
    toggleAudio,
    unclaimedSettlement,
    claimSettlement,
  } = useBTC6();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Format countdown seconds into MMm SSs
  const mins = Math.floor(candleData.secondsRemaining / 60);
  const secs = candleData.secondsRemaining % 60;
  const timeFormatted = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#0b0e14]/90 backdrop-blur-xl border-b border-[#1e293b] z-40 flex items-center justify-between px-3 sm:px-6">
      {/* Left zone: BTC Live Spot & 1H Candle Countdown */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* BTC/USDT Spot Price */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="font-mono text-[10px] sm:text-xs text-[#849495] font-semibold">
            BTC/USDT
          </span>
          <span className="font-mono text-xs sm:text-sm lg:text-base font-bold text-white tracking-wide">
            ${candleData.spotPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="flex items-center font-mono text-[10px] sm:text-xs text-[#00e475] font-bold">
            <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-0.5" />
            +{candleData.change24h}%
          </span>
        </div>

        {/* 1H Candle Countdown Capsule */}
        <div className="hidden xs:flex items-center gap-1.5 bg-[#191c22] px-2.5 py-1 rounded-lg border border-[#272a31]">
          <Timer className="w-3.5 h-3.5 text-[#f7931a] animate-pulse" />
          <span className="font-mono text-[10px] text-[#849495] uppercase hidden md:inline">
            1H CANDLE CLOSES IN:
          </span>
          <span className="font-mono text-xs sm:text-sm font-bold text-[#f7931a] tracking-wider">
            {timeFormatted}
          </span>
        </div>
      </div>

      {/* Right zone: Available Balance, Deposit Action, Audio, Notifications */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Available Balance Pill & Deposit Button */}
        <div className="flex items-center gap-2 bg-[#191c22] px-2.5 sm:px-3 py-1.5 rounded-xl border border-[#272a31]">
          <div className="flex flex-col text-right">
            <span className="font-mono text-[8px] sm:text-[9px] text-[#849495] uppercase tracking-wider">
              AVAILABLE
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-tight">
              {walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
              <span className="text-[#00f2fe] text-[10px] font-semibold">USDT</span>
            </span>
          </div>

          <button
            onClick={() => setIsDepositModalOpen(true)}
            className="bg-[#00f2fe] hover:bg-[#6ff6ff] text-[#002022] px-2.5 sm:px-3 py-1 rounded-md font-mono text-[11px] font-extrabold uppercase transition-all shadow-[0_0_14px_rgba(0,242,254,0.35)] active:scale-95"
          >
            Deposit
          </button>
        </div>

        {/* Sound toggle button */}
        <button
          onClick={toggleAudio}
          title={audioEnabled ? 'Mute Terminal Audio' : 'Unmute Terminal Audio'}
          className="w-8 h-8 sm:w-9 sm:h-9 hidden sm:flex items-center justify-center rounded-lg bg-[#191c22] text-[#849495] hover:text-white hover:bg-[#272a31] border border-[#272a31] transition-colors"
        >
          {audioEnabled ? <Volume2 className="w-4 h-4 text-[#00f2fe]" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Oracle Health Icon */}
        <div
          title="Oracle Attested: Chainlink + Pyth consensus"
          className="w-8 h-8 sm:w-9 sm:h-9 hidden md:flex items-center justify-center rounded-lg bg-[#191c22] text-[#00e475] border border-[#272a31]"
        >
          <ShieldCheck className="w-4 h-4" />
        </div>

        {/* Notifications Icon & Drawer */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-[#191c22] text-[#849495] hover:text-white hover:bg-[#272a31] border border-[#272a31] transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unclaimedSettlement > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00e475] animate-ping" />
            )}
            {unclaimedSettlement > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00e475]" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {isNotificationsOpen && (
            <div className="absolute right-0 top-11 w-80 sm:w-96 rounded-xl bg-[#0b0e14] border border-[#272a31] p-3 shadow-2xl z-50 flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
                <div className="flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-[#00f2fe]" />
                  <span className="font-sans font-bold text-xs uppercase tracking-wider text-white">
                    Terminal Notifications
                  </span>
                </div>
                <button
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-[#849495] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Notification Items */}
              {unclaimedSettlement > 0 && (
                <div className="bg-[#191c22] p-2.5 rounded-lg border border-[#00e475]/40 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#00e475] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> JACKPOT SETTLEMENT READY
                    </span>
                    <span className="font-mono text-[9px] text-[#849495]">ROUND #1399</span>
                  </div>
                  <p className="font-sans text-xs text-[#e1e2eb]">
                    Ticket #TK-8839 hit 3 out of 4 matches! +{unclaimedSettlement.toFixed(2)} USDT available to claim.
                  </p>
                  <button
                    onClick={() => {
                      claimSettlement();
                      setIsNotificationsOpen(false);
                    }}
                    className="w-full py-1 rounded bg-[#00e475] hover:bg-[#62ff96] text-[#00210b] font-mono text-[11px] font-bold uppercase transition-all shadow-[0_0_10px_rgba(0,228,117,0.3)]"
                  >
                    Claim +{unclaimedSettlement.toFixed(2)} USDT to Vault
                  </button>
                </div>
              )}

              <div className="bg-[#191c22] p-2.5 rounded-lg border border-[#272a31] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#00f2fe] font-bold">
                    CANDLE IN FLIGHT
                  </span>
                  <span className="font-mono text-[9px] text-[#849495]">ROUND #1400</span>
                </div>
                <p className="font-sans text-xs text-[#b9cacb]">
                  Sub-second price oracle synchronized with Binance index. Block #884,912.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
