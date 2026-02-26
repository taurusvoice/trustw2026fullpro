"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface CryptoAsset {
  symbol: string
  name: string
  network: string
  balance: number
  balanceUSD: number
  price: number
  change24h: number
  color: string
  address: string
  icon?: string
}

export interface Transaction {
  id: string
  type: "send" | "receive" | "swap"
  asset: string
  amount: number
  usdValue: number
  to?: string
  from?: string
  swapTo?: string
  swapToAmount?: number
  timestamp: Date
  status: "completed" | "pending" | "failed"
  hash: string
}

export interface TrendingToken {
  rank: number
  name: string
  symbol: string
  price: number
  change24h: number
  mcap: string
  volume: string
  color: string
}

interface WalletContextType {
  assets: CryptoAsset[]
  transactions: Transaction[]
  totalBalance: number
  sendCrypto: (symbol: string, amount: number, toAddress: string) => Promise<boolean>
  swapCrypto: (fromSymbol: string, toSymbol: string, fromAmount: number) => Promise<boolean>
  getAsset: (symbol: string) => CryptoAsset | undefined
  addTransaction: (tx: Omit<Transaction, "id" | "timestamp" | "hash">) => void
  walletName: string
  setWalletName: (name: string) => void
  hideSmallBalances: boolean
  setHideSmallBalances: (v: boolean) => void
}

const WalletContext = createContext<WalletContextType | null>(null)

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error("useWallet must be inside WalletProvider")
  return ctx
}

// $2.4M distributed across all crypto assets with realistic proportions
const initialAssets: CryptoAsset[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    network: "Bitcoin",
    balance: 8.4215,
    balanceUSD: 875_917.80,
    price: 104_010.00,
    change24h: 3.42,
    color: "#F7931A",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    network: "Ethereum",
    balance: 128.75,
    balanceUSD: 456_340.00,
    price: 3_544.00,
    change24h: 5.18,
    color: "#627EEA",
    address: "0x91dBeFC38A425EaE9Af6867aD6eD1db7fbD7155F",
  },
  {
    symbol: "BNB",
    name: "BNB Smart Chain",
    network: "BNB Smart Chain",
    balance: 412.5,
    balanceUSD: 254_925.00,
    price: 617.90,
    change24h: -1.23,
    color: "#F3BA2F",
    address: "0x91dBeFC38A425EaE9Af6867aD6eD1db7fbD7155F",
  },
  {
    symbol: "SOL",
    name: "Solana",
    network: "Solana",
    balance: 845.32,
    balanceUSD: 152_157.60,
    price: 180.00,
    change24h: 8.54,
    color: "#9945FF",
    address: "FPwQ7VaFAhD6TyPFQTrcxNS5mce73N55sjc5faVDFsoG",
  },
  {
    symbol: "XRP",
    name: "XRP",
    network: "XRP",
    balance: 85_420,
    balanceUSD: 131_546.80,
    price: 1.54,
    change24h: 4.39,
    color: "#23292F",
    address: "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
  },
  {
    symbol: "USDT",
    name: "Tether",
    network: "Ethereum",
    balance: 185_250.00,
    balanceUSD: 185_250.00,
    price: 1.00,
    change24h: 0.01,
    color: "#26A17B",
    address: "0x91dBeFC38A425EaE9Af6867aD6eD1db7fbD7155F",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    network: "Ethereum",
    balance: 124_800.00,
    balanceUSD: 124_800.00,
    price: 1.00,
    change24h: 0.00,
    color: "#2775CA",
    address: "0x91dBeFC38A425EaE9Af6867aD6eD1db7fbD7155F",
  },
  {
    symbol: "ADA",
    name: "Cardano",
    network: "Cardano",
    balance: 142_500,
    balanceUSD: 74_100.00,
    price: 0.52,
    change24h: -0.82,
    color: "#0033AD",
    address: "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj83ws8lhrn648jjxtwq2ytjc7",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    network: "Dogecoin",
    balance: 312_500,
    balanceUSD: 43_750.00,
    price: 0.14,
    change24h: 3.10,
    color: "#C2A633",
    address: "DH5yaBrsd4P2L2YijPT1BoMRMcng7K8fN2p",
  },
  {
    symbol: "TRX",
    name: "Tron",
    network: "Tron",
    balance: 285_000,
    balanceUSD: 38_475.00,
    price: 0.135,
    change24h: 2.10,
    color: "#FF0013",
    address: "TC3R1py58iCKezyptRikftasw6GSqTiDC3",
  },
  {
    symbol: "AVAX",
    name: "Avalanche C-Chain",
    network: "Avalanche C-Chain",
    balance: 725.0,
    balanceUSD: 26_825.00,
    price: 37.00,
    change24h: -2.30,
    color: "#E84142",
    address: "0x91dBeFC38A425EaE9Af6867aD6eD1db7fbD7155F",
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    network: "Ethereum",
    balance: 1_420.0,
    balanceUSD: 19_880.00,
    price: 14.00,
    change24h: 6.90,
    color: "#2A5ADA",
    address: "0x91dBeFC38A425EaE9Af6867aD6eD1db7fbD7155F",
  },
  {
    symbol: "DOT",
    name: "Polkadot",
    network: "Polkadot",
    balance: 2_100.0,
    balanceUSD: 15_540.00,
    price: 7.40,
    change24h: 1.85,
    color: "#E6007A",
    address: "15oF4uVJwmo4TdGW7VfQxNLavjCXviqWrztPu2PeCzMQB7Tp",
  },
  {
    symbol: "TWT",
    name: "Trust Wallet Token",
    network: "BNB Smart Chain",
    balance: 5_830,
    balanceUSD: 7_287.50,
    price: 1.25,
    change24h: 1.50,
    color: "#3375BB",
    address: "0x91dBeFC38A425EaE9Af6867aD6eD1db7fbD7155F",
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    network: "Polygon",
    balance: 12_400,
    balanceUSD: 7_440.00,
    price: 0.60,
    change24h: -1.42,
    color: "#8247E5",
    address: "0x91dBeFC38A425EaE9Af6867aD6eD1db7fbD7155F",
  },
]

function generateHash(): string {
  return "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
}

const initialTransactions: Transaction[] = [
  {
    id: "1",
    type: "receive",
    asset: "BTC",
    amount: 0.5,
    usdValue: 52_005,
    from: "bc1q9h5yjqka3pv5f97s62ee2dqsm3rqyzmmluvk9p",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "completed",
    hash: "0xa1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
  },
  {
    id: "2",
    type: "send",
    asset: "ETH",
    amount: 2.0,
    usdValue: 7_088,
    to: "0xAbC1234567890dEf1234567890AbCdEf12345678",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    status: "completed",
    hash: "0xf6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5",
  },
  {
    id: "3",
    type: "swap",
    asset: "BNB",
    amount: 5.0,
    usdValue: 3_089.50,
    swapTo: "USDT",
    swapToAmount: 3_089.50,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: "completed",
    hash: "0x1234abcd5678ef901234abcd5678ef901234abcd5678ef901234abcd5678ef90",
  },
  {
    id: "4",
    type: "receive",
    asset: "USDT",
    amount: 15_000,
    usdValue: 15_000,
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    status: "completed",
    hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  },
  {
    id: "5",
    type: "send",
    asset: "SOL",
    amount: 25.0,
    usdValue: 4_500,
    to: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
    status: "completed",
    hash: "0x5678901234abcdef5678901234abcdef5678901234abcdef5678901234abcdef",
  },
]

export const trendingTokens: TrendingToken[] = [
  { rank: 1, name: "BNB pegged XRP Token", symbol: "XRP", price: 1.4413, change24h: 4.39, mcap: "$87.9B", volume: "$4.4B", color: "#23292F" },
  { rank: 2, name: "Chainlink", symbol: "LINK", price: 14.23, change24h: 6.90, mcap: "$8.5B", volume: "$600.6M", color: "#2A5ADA" },
  { rank: 3, name: "Tether Gold", symbol: "XAUT", price: 5152.40, change24h: 0.01, mcap: "$2.6B", volume: "$377.2M", color: "#C9A447" },
  { rank: 4, name: "PAX Gold", symbol: "PAXG", price: 5185.20, change24h: -0.02, mcap: "$2.4B", volume: "$364M", color: "#E4A834" },
  { rank: 5, name: "Aster", symbol: "ASTR", price: 0.7133, change24h: 2.58, mcap: "$1.7B", volume: "$120.3M", color: "#70503D" },
]

export const topMoversStocks: TrendingToken[] = [
  { rank: 1, name: "Circle Internet Group (On...)", symbol: "CRCL", price: 82.558, change24h: 19.75, mcap: "$61.1M", volume: "$13.4M", color: "#8B5CF6" },
  { rank: 2, name: "iShares Silver Trust (On...)", symbol: "SLV", price: 79.305, change24h: -2.81, mcap: "$37.9M", volume: "$10.7M", color: "#D97706" },
  { rank: 3, name: "Alphabet Class A (Ondo...)", symbol: "GOOGL", price: 312.19, change24h: -0.14, mcap: "$52.8M", volume: "$1.7M", color: "#4285F4" },
]

export const topMoversMemes: TrendingToken[] = [
  { rank: 1, name: "Pepe", symbol: "PEPE", price: 0.00001234, change24h: 15.20, mcap: "$5.2B", volume: "$1.8B", color: "#3E9B4F" },
  { rank: 2, name: "Dogecoin", symbol: "DOGE", price: 0.14, change24h: 3.10, mcap: "$18.5B", volume: "$800M", color: "#C2A633" },
  { rank: 3, name: "Shiba Inu", symbol: "SHIB", price: 0.0000085, change24h: -1.50, mcap: "$5B", volume: "$300M", color: "#FFA500" },
]

export const topMoversAI: TrendingToken[] = [
  { rank: 1, name: "Render Token", symbol: "RNDR", price: 7.82, change24h: 12.40, mcap: "$3.1B", volume: "$420M", color: "#1DA1F2" },
  { rank: 2, name: "Fetch.ai", symbol: "FET", price: 2.18, change24h: 8.90, mcap: "$2.1B", volume: "$310M", color: "#1F2937" },
  { rank: 3, name: "Ocean Protocol", symbol: "OCEAN", price: 0.89, change24h: 5.62, mcap: "$800M", volume: "$95M", color: "#141414" },
]

export const networkFilters = [
  { label: "All", color: "#2ecc71" },
  { label: "BTC", color: "#F7931A" },
  { label: "ETH", color: "#627EEA" },
  { label: "SOL", color: "#9945FF" },
  { label: "BNB", color: "#F3BA2F" },
  { label: "TRX", color: "#FF0013" },
  { label: "AVAX", color: "#E84142" },
  { label: "USDT", color: "#26A17B" },
]

export function WalletProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<CryptoAsset[]>(initialAssets)
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [walletName, setWalletName] = useState("Main Wallet 1")
  const [hideSmallBalances, setHideSmallBalances] = useState(false)

  const totalBalance = assets.reduce((sum, a) => sum + a.balanceUSD, 0)

  const getAsset = useCallback(
    (symbol: string) => assets.find((a) => a.symbol === symbol),
    [assets]
  )

  const addTransaction = useCallback(
    (tx: Omit<Transaction, "id" | "timestamp" | "hash">) => {
      const newTx: Transaction = {
        ...tx,
        id: String(Date.now()),
        timestamp: new Date(),
        hash: generateHash(),
      }
      setTransactions((prev) => [newTx, ...prev])
    },
    []
  )

  const sendCrypto = useCallback(
    async (symbol: string, amount: number, toAddress: string): Promise<boolean> => {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 1500))

      setAssets((prev) =>
        prev.map((a) => {
          if (a.symbol === symbol) {
            const newBalance = a.balance - amount
            return {
              ...a,
              balance: newBalance,
              balanceUSD: newBalance * a.price,
            }
          }
          return a
        })
      )

      addTransaction({
        type: "send",
        asset: symbol,
        amount,
        usdValue: amount * (assets.find((a) => a.symbol === symbol)?.price || 0),
        to: toAddress,
        status: "completed",
      })

      return true
    },
    [assets, addTransaction]
  )

  const swapCrypto = useCallback(
    async (fromSymbol: string, toSymbol: string, fromAmount: number): Promise<boolean> => {
      await new Promise((r) => setTimeout(r, 1500))

      const fromAsset = assets.find((a) => a.symbol === fromSymbol)
      const toAsset = assets.find((a) => a.symbol === toSymbol)
      if (!fromAsset || !toAsset) return false

      const usdValue = fromAmount * fromAsset.price
      const toAmount = usdValue / toAsset.price

      setAssets((prev) =>
        prev.map((a) => {
          if (a.symbol === fromSymbol) {
            const newBal = a.balance - fromAmount
            return { ...a, balance: newBal, balanceUSD: newBal * a.price }
          }
          if (a.symbol === toSymbol) {
            const newBal = a.balance + toAmount
            return { ...a, balance: newBal, balanceUSD: newBal * a.price }
          }
          return a
        })
      )

      addTransaction({
        type: "swap",
        asset: fromSymbol,
        amount: fromAmount,
        usdValue,
        swapTo: toSymbol,
        swapToAmount: toAmount,
        status: "completed",
      })

      return true
    },
    [assets, addTransaction]
  )

  return (
    <WalletContext.Provider
      value={{
        assets,
        transactions,
        totalBalance,
        sendCrypto,
        swapCrypto,
        getAsset,
        addTransaction,
        walletName,
        setWalletName,
        hideSmallBalances,
        setHideSmallBalances,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
