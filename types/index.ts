export type CandleBias = 'BULL' | 'BEAR' | 'DOJI';

export interface PredictionDigits {
  open: [number, number];   // e.g. [4, 2]
  high: [number, number];   // e.g. [7, 8]
  close: [number, number];  // e.g. [3, 1]
}

export type TicketStatus = 'ACTIVE' | 'WON' | 'LOST' | 'CLAIMED';

export interface BTCTicket {
  id: string;
  txHash: string;
  roundNumber: number;
  epochTimestamp: number;
  candleHourUTC: string;
  digits: PredictionDigits;
  bias: CandleBias;
  stake: number;          // in USDT
  multiplier: number;     // e.g. 1x, 5x, 10x, 25x, 50x
  potentialPayout: number;// in USDT
  status: TicketStatus;
  wonAmount?: number;
  matchScore?: {
    openMatched: boolean;
    highMatched: boolean;
    closeMatched: boolean;
    biasMatched: boolean;
    matchedCount: number;
  };
  serverSeedHash: string;
  clientSeed: string;
  createdAt: number;
}

export interface CandleTelemetry {
  symbol: string;
  spotPrice: number;
  change24h: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  currentPrice: number;
  currentCloseDigits: [number, number];
  currentHighDigits: [number, number];
  currentOpenDigits: [number, number];
  candleBias: CandleBias;
  progressPercent: number;
  secondsRemaining: number;
  roundNumber: number;
  blockHeight: number;
  oracleAttested: boolean;
  serverSeedHash: string;
  activeClientSeed: string;
}

export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'TICKET_PURCHASE' | 'JACKPOT_PAYOUT' | 'SWAP';

export interface WalletTransaction {
  id: string;
  timeUTC: string;
  type: TransactionType;
  title: string;
  routing: string;
  amount: number; // positive or negative
  verificationState: string;
  txHash: string;
  status: 'CONFIRMED' | 'PENDING' | 'SETTLED';
}

export interface RoundHistoryItem {
  round: number;
  timeUTC: string;
  bias: CandleBias;
  open: string;
  high: string;
  close: string;
  winner: string;
  payout: number;
}
