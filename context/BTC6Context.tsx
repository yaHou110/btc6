'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BTCTicket,
  CandleTelemetry,
  WalletTransaction,
  RoundHistoryItem,
  PredictionDigits,
  CandleBias,
} from '@/types';

interface BTC6ContextType {
  currentTab: 'play' | 'dashboard' | 'tickets' | 'wallet' | 'rules';
  setCurrentTab: (tab: 'play' | 'dashboard' | 'tickets' | 'wallet' | 'rules') => void;
  walletBalance: number;
  lockedInRounds: number;
  unclaimedSettlement: number;
  tickets: BTCTicket[];
  transactions: WalletTransaction[];
  roundHistory: RoundHistoryItem[];
  candleData: CandleTelemetry;
  mintTicket: (digits: PredictionDigits, bias: CandleBias, multiplier: number, stake: number) => BTCTicket | null;
  claimSettlement: (ticketId?: string) => void;
  depositFunds: (amount: number, rail: string) => void;
  withdrawFunds: (amount: number, address: string) => boolean;
  isDepositModalOpen: boolean;
  setIsDepositModalOpen: (open: boolean) => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
  activeToast: { title: string; message: string; type?: 'info' | 'success' | 'warn' } | null;
  showToast: (title: string, message: string, type?: 'info' | 'success' | 'warn') => void;
}

const BTC6Context = createContext<BTC6ContextType | undefined>(undefined);

const INITIAL_TICKETS: BTCTicket[] = [
  {
    id: 'TK-8841',
    txHash: '0x3d41...b729',
    roundNumber: 1400,
    epochTimestamp: Date.now() - 42 * 60 * 1000,
    candleHourUTC: '14:00 UTC',
    digits: {
      open: [4, 2],
      high: [7, 8],
      close: [3, 1],
    },
    bias: 'BULL',
    stake: 250,
    multiplier: 25,
    potentialPayout: 10800,
    status: 'ACTIVE',
    serverSeedHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    clientSeed: '0x9c4f810aa724b918ee0145cbe49102c4819d9b61',
    createdAt: Date.now() - 40 * 60 * 1000,
  },
  {
    id: 'TK-8840',
    txHash: '0x8892...e14f',
    roundNumber: 1400,
    epochTimestamp: Date.now() - 30 * 60 * 1000,
    candleHourUTC: '14:00 UTC',
    digits: {
      open: [4, 2],
      high: [7, 4],
      close: [2, 9],
    },
    bias: 'BULL',
    stake: 50,
    multiplier: 5,
    potentialPayout: 1800,
    status: 'ACTIVE',
    serverSeedHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    clientSeed: '0x17c2f810aa724b918ee0145cbe49102c4819d9b42',
    createdAt: Date.now() - 28 * 60 * 1000,
  },
  {
    id: 'TK-8839',
    txHash: '0x3d90...90a1',
    roundNumber: 1399,
    epochTimestamp: Date.now() - 100 * 60 * 1000,
    candleHourUTC: '13:00 UTC',
    digits: {
      open: [1, 8],
      high: [9, 2],
      close: [6, 4],
    },
    bias: 'BULL',
    stake: 250,
    multiplier: 25,
    potentialPayout: 1200,
    wonAmount: 1200,
    status: 'WON', // Ready to claim
    matchScore: {
      openMatched: true,
      highMatched: false,
      closeMatched: true,
      biasMatched: true,
      matchedCount: 3,
    },
    serverSeedHash: '7a5e921fb94d8123ac912048fe49a7123984d723b1859c2384a19b84172849e1',
    clientSeed: '0x718f4a19280b1823901cf10283c71981298418ab',
    createdAt: Date.now() - 110 * 60 * 1000,
  },
  {
    id: 'TK-8835',
    txHash: '0x1af4...bc90',
    roundNumber: 1398,
    epochTimestamp: Date.now() - 160 * 60 * 1000,
    candleHourUTC: '12:00 UTC',
    digits: {
      open: [4, 0],
      high: [9, 1],
      close: [0, 8],
    },
    bias: 'BEAR',
    stake: 100,
    multiplier: 10,
    potentialPayout: 3600,
    status: 'LOST',
    matchScore: {
      openMatched: false,
      highMatched: false,
      closeMatched: false,
      biasMatched: true,
      matchedCount: 1,
    },
    serverSeedHash: '4f91823ab192837190f849182938472918471928347192837491829384719283',
    clientSeed: '0x32194819a8f49182938471928471928374918293',
    createdAt: Date.now() - 170 * 60 * 1000,
  },
  {
    id: 'TK-8822',
    txHash: '0x8861...2cad',
    roundNumber: 1395,
    epochTimestamp: Date.now() - 340 * 60 * 1000,
    candleHourUTC: '09:00 UTC',
    digits: {
      open: [0, 3],
      high: [7, 7],
      close: [9, 9],
    },
    bias: 'BULL',
    stake: 250,
    multiplier: 25,
    potentialPayout: 3500,
    wonAmount: 3500,
    status: 'CLAIMED',
    matchScore: {
      openMatched: true,
      highMatched: true,
      closeMatched: true,
      biasMatched: true,
      matchedCount: 4,
    },
    serverSeedHash: '984182938471928347192837491829384719283e3b0c44298fc1c149afbf4c8',
    clientSeed: '0x992847192837491829384719283e3b0c44298fc1',
    createdAt: Date.now() - 350 * 60 * 1000,
  },
];

const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx-1',
    timeUTC: '2026-10-04 17:00:14',
    type: 'JACKPOT_PAYOUT',
    title: 'Jackpot Payout',
    routing: 'Round #1399 Exact Digits [64]',
    amount: 1200.0,
    verificationState: 'CONFIRMED // BLOCK #884,908',
    txHash: '0x9a8f...39c1',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-2',
    timeUTC: '2026-10-04 16:45:02',
    type: 'TICKET_PURCHASE',
    title: 'Ticket Purchase',
    routing: '25x Entry Slip · Ticket #TK-8841',
    amount: -250.0,
    verificationState: 'SETTLED ON-CHAIN',
    txHash: '0x77c2...e810',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-3',
    timeUTC: '2026-10-04 16:30:19',
    type: 'TICKET_PURCHASE',
    title: 'Ticket Purchase',
    routing: '5x Entry Slip · Ticket #TK-8840',
    amount: -50.0,
    verificationState: 'SETTLED ON-CHAIN',
    txHash: '0x8892...e14f',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-4',
    timeUTC: '2026-10-04 15:20:19',
    type: 'DEPOSIT',
    title: 'Vault Deposit',
    routing: 'TRC20 Network Inflow',
    amount: 5000.0,
    verificationState: 'CONFIRMED // 48 BLOCKS',
    txHash: '0x310b...f7aa',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-5',
    timeUTC: '2026-10-04 12:12:44',
    type: 'WITHDRAWAL',
    title: 'Vault Withdrawal',
    routing: 'Cold Enclave 0x882A...770C',
    amount: -7450.0,
    verificationState: 'CONFIRMED // MULTI-SIG 3/5',
    txHash: '0x5f02...11d9',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-6',
    timeUTC: '2026-10-04 09:33:55',
    type: 'DEPOSIT',
    title: 'Vault Deposit',
    routing: 'Arbitrum Inflow',
    amount: 2500.0,
    verificationState: 'CONFIRMED // FAST-L2',
    txHash: '0x49ef...c882',
    status: 'CONFIRMED',
  },
];

const INITIAL_ROUNDS: RoundHistoryItem[] = [
  {
    round: 1399,
    timeUTC: '13:00 UTC',
    bias: 'BULL',
    open: '18',
    high: '92',
    close: '64',
    winner: '0x82...fa',
    payout: 4800,
  },
  {
    round: 1398,
    timeUTC: '12:00 UTC',
    bias: 'BEAR',
    open: '75',
    high: '81',
    close: '04',
    winner: '0x3d...90',
    payout: 1800,
  },
  {
    round: 1397,
    timeUTC: '11:00 UTC',
    bias: 'BULL',
    open: '40',
    high: '66',
    close: '95',
    winner: '0x11...c4',
    payout: 3600,
  },
];

export function BTC6Provider({ children }: { children: React.ReactNode }) {
  const [currentTab, setCurrentTab] = useState<'play' | 'dashboard' | 'tickets' | 'wallet' | 'rules'>('play');
  const [walletBalance, setWalletBalance] = useState<number>(12450.0);
  const [unclaimedSettlement, setUnclaimedSettlement] = useState<number>(1200.0);
  const [tickets, setTickets] = useState<BTCTicket[]>(INITIAL_TICKETS);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [roundHistory] = useState<RoundHistoryItem[]>(INITIAL_ROUNDS);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [activeToast, setActiveToast] = useState<{ title: string; message: string; type?: 'info' | 'success' | 'warn' } | null>(null);

  // Live Candle Telemetry State
  const [candleData, setCandleData] = useState<CandleTelemetry>({
    symbol: 'BINANCE:BTCUSDT.P',
    spotPrice: 64281.5,
    change24h: 3.42,
    openPrice: 64150.42,
    highPrice: 64510.74,
    lowPrice: 64080.12,
    currentPrice: 64278.29,
    currentOpenDigits: [4, 2],
    currentHighDigits: [7, 4],
    currentCloseDigits: [2, 9],
    candleBias: 'BULL',
    progressPercent: 68.8,
    secondsRemaining: 18 * 60 + 42, // 18m 42s
    roundNumber: 1400,
    blockHeight: 884912,
    oracleAttested: true,
    serverSeedHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    activeClientSeed: '0x9c4f810aa724b918ee0145cbe49102c4819d9b61',
  });

  // Countdown and price tick timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCandleData((prev) => {
        const nextSeconds = prev.secondsRemaining > 0 ? prev.secondsRemaining - 1 : 3600;
        const progress = Number((((3600 - nextSeconds) / 3600) * 100).toFixed(1));

        // Sub-second jitter simulation for realistic market pulse
        const delta = (Math.random() - 0.49) * 4.5;
        const newSpot = Number((prev.spotPrice + delta).toFixed(2));
        const closeInt = Math.floor(newSpot);
        const lastTwo = closeInt % 100;
        const d1 = Math.floor(lastTwo / 10);
        const d2 = lastTwo % 10;

        return {
          ...prev,
          secondsRemaining: nextSeconds,
          progressPercent: progress,
          spotPrice: newSpot,
          currentPrice: newSpot,
          currentCloseDigits: [d1, d2],
          highPrice: Math.max(prev.highPrice, newSpot),
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const showToast = (title: string, message: string, type: 'info' | 'success' | 'warn' = 'info') => {
    setActiveToast({ title, message, type });
    setTimeout(() => {
      setActiveToast(null);
    }, 4000);
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  // Locked in active rounds
  const lockedInRounds = tickets
    .filter((t) => t.status === 'ACTIVE')
    .reduce((sum, t) => sum + t.stake, 0);

  const mintTicket = (digits: PredictionDigits, bias: CandleBias, multiplier: number, stake: number): BTCTicket | null => {
    if (walletBalance < stake) {
      showToast('Insufficient Capital', `Your balance is ${walletBalance.toFixed(2)} USDT. Required: ${stake.toFixed(2)} USDT`, 'warn');
      return null;
    }

    const newTicketId = `TK-${Math.floor(8842 + Math.random() * 50)}`;
    const randomHash = '0x' + Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '...' + Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const newTicket: BTCTicket = {
      id: newTicketId,
      txHash: randomHash,
      roundNumber: candleData.roundNumber,
      epochTimestamp: Date.now(),
      candleHourUTC: '14:00 UTC',
      digits,
      bias,
      stake,
      multiplier,
      potentialPayout: stake * 36, // 36x to 360x depending on rules
      status: 'ACTIVE',
      serverSeedHash: candleData.serverSeedHash,
      clientSeed: candleData.activeClientSeed,
      createdAt: Date.now(),
    };

    // Update state
    setWalletBalance((prev) => prev - stake);
    setTickets((prev) => [newTicket, ...prev]);

    // Add transaction
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      timeUTC: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: 'TICKET_PURCHASE',
      title: 'Ticket Purchase',
      routing: `${multiplier}x Entry Slip · Ticket #${newTicketId}`,
      amount: -stake,
      verificationState: 'BROADCASTED // MEMPOOL',
      txHash: randomHash,
      status: 'CONFIRMED',
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast('Ticket Minted Successfully', `Ticket #${newTicketId} active for Round #${candleData.roundNumber}`, 'success');
    return newTicket;
  };

  const claimSettlement = (ticketId?: string) => {
    const toClaim = unclaimedSettlement;
    if (toClaim <= 0) {
      showToast('No Unclaimed Rewards', 'You currently have zero unclaimed settlements.', 'info');
      return;
    }

    setWalletBalance((prev) => prev + toClaim);
    setUnclaimedSettlement(0);

    // Update tickets
    setTickets((prev) =>
      prev.map((t) => (t.status === 'WON' ? { ...t, status: 'CLAIMED' } : t))
    );

    // Add to transaction ledger
    const claimTx: WalletTransaction = {
      id: `tx-claim-${Date.now()}`,
      timeUTC: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: 'JACKPOT_PAYOUT',
      title: 'Claimed Settlement',
      routing: ticketId ? `Direct Settlement Ticket #${ticketId}` : 'Bulk Settle to Institutional Vault',
      amount: toClaim,
      verificationState: 'CONFIRMED // INSTANT VAULT',
      txHash: '0x' + Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '...settled',
      status: 'CONFIRMED',
    };
    setTransactions((prev) => [claimTx, ...prev]);

    showToast('Settlement Claimed', `+${toClaim.toFixed(2)} USDT transferred to available balance`, 'success');
  };

  const depositFunds = (amount: number, rail: string) => {
    setWalletBalance((prev) => prev + amount);

    const depTx: WalletTransaction = {
      id: `dep-${Date.now()}`,
      timeUTC: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: 'DEPOSIT',
      title: 'Vault Deposit',
      routing: `${rail} Inflow Received`,
      amount,
      verificationState: 'CONFIRMED // 12 BLOCKS',
      txHash: '0x' + Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '...cred',
      status: 'CONFIRMED',
    };
    setTransactions((prev) => [depTx, ...prev]);
    setIsDepositModalOpen(false);
    showToast('Deposit Confirmed', `+${amount.toFixed(2)} USDT credited via ${rail}`, 'success');
  };

  const withdrawFunds = (amount: number, address: string): boolean => {
    if (amount > walletBalance) {
      showToast('Insufficient Balance', 'Requested withdrawal exceeds available balance.', 'warn');
      return false;
    }

    setWalletBalance((prev) => prev - amount);
    const withTx: WalletTransaction = {
      id: `with-${Date.now()}`,
      timeUTC: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: 'WITHDRAWAL',
      title: 'Vault Withdrawal',
      routing: `Enclave ${address.substring(0, 8)}...`,
      amount: -amount,
      verificationState: 'CONFIRMED // MULTI-SIG 3/5',
      txHash: '0x' + Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '...mult',
      status: 'CONFIRMED',
    };
    setTransactions((prev) => [withTx, ...prev]);
    showToast('Withdrawal Dispatched', `-${amount.toFixed(2)} USDT submitted to multi-sig timelock queue`, 'success');
    return true;
  };

  return (
    <BTC6Context.Provider
      value={{
        currentTab,
        setCurrentTab,
        walletBalance,
        lockedInRounds,
        unclaimedSettlement,
        tickets,
        transactions,
        roundHistory,
        candleData,
        mintTicket,
        claimSettlement,
        depositFunds,
        withdrawFunds,
        isDepositModalOpen,
        setIsDepositModalOpen,
        audioEnabled,
        toggleAudio,
        activeToast,
        showToast,
      }}
    >
      {children}
    </BTC6Context.Provider>
  );
}

export function useBTC6() {
  const context = useContext(BTC6Context);
  if (!context) {
    throw new Error('useBTC6 must be used within a BTC6Provider');
  }
  return context;
}
