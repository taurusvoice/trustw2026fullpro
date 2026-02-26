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

export const cryptoAssets: CryptoAsset[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    network: "Bitcoin",
    balance: 0.5,
    balanceUSD: 54100.0,
    price: 108200.0,
    change24h: 12.0,
    color: "#F7931A",
    address: "bc1qfxz...u9vwjv",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    network: "Ethereum",
    balance: 2.35,
    balanceUSD: 7850.0,
    price: 3340.0,
    change24h: 5.2,
    color: "#627EEA",
    address: "0x91dBe...D7155F",
  },
  {
    symbol: "XRP",
    name: "XRP",
    network: "XRP",
    balance: 1500,
    balanceUSD: 2145.0,
    price: 1.43,
    change24h: 4.39,
    color: "#23292F",
    address: "rjwjOU...N3tW8b",
  },
  {
    symbol: "BNB",
    name: "BNB Smart Chain",
    network: "BNB Smart Chain",
    balance: 3.2,
    balanceUSD: 1920.0,
    price: 600.0,
    change24h: -1.2,
    color: "#F3BA2F",
    address: "0x91dBe...D7155F",
  },
  {
    symbol: "SOL",
    name: "Solana",
    network: "Solana",
    balance: 15,
    balanceUSD: 2625.0,
    price: 175.0,
    change24h: 8.5,
    color: "#9945FF",
    address: "FPwQ7Va...VDFsoG",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    network: "Dogecoin",
    balance: 5000,
    balanceUSD: 650.0,
    price: 0.13,
    change24h: 3.1,
    color: "#C2A633",
    address: "DH5yaB...K8fN2p",
  },
  {
    symbol: "ADA",
    name: "Cardano",
    network: "Cardano",
    balance: 3000,
    balanceUSD: 1470.0,
    price: 0.49,
    change24h: -0.8,
    color: "#0033AD",
    address: "addr1q...7gf4k2",
  },
  {
    symbol: "TRX",
    name: "Tron",
    network: "Tron",
    balance: 10000,
    balanceUSD: 1650.0,
    price: 0.165,
    change24h: 2.1,
    color: "#FF0013",
    address: "TC3R1p...GSqTiDC3",
  },
  {
    symbol: "AVAX",
    name: "Avalanche C-Chain",
    network: "Avalanche C-Chain",
    balance: 50,
    balanceUSD: 1750.0,
    price: 35.0,
    change24h: -2.3,
    color: "#E84142",
    address: "0x91dBe...D7155F",
  },
  {
    symbol: "TWT",
    name: "Trust Wallet Token",
    network: "BNB Smart Chain",
    balance: 500,
    balanceUSD: 625.0,
    price: 1.25,
    change24h: 1.5,
    color: "#3375BB",
    address: "0x91dBe...D7155F",
  },
  {
    symbol: "USDT",
    name: "Tether",
    network: "Ethereum",
    balance: 1000,
    balanceUSD: 1000.0,
    price: 1.0,
    change24h: 0.01,
    color: "#26A17B",
    address: "0x91dBe...D7155F",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    network: "Ethereum",
    balance: 500,
    balanceUSD: 500.0,
    price: 1.0,
    change24h: 0.0,
    color: "#2775CA",
    address: "0x91dBe...D7155F",
  },
]

export const trendingTokens: TrendingToken[] = [
  {
    rank: 1,
    name: "BNB pegged XRP Token",
    symbol: "XRP",
    price: 1.4413,
    change24h: 4.39,
    mcap: "$87.9B",
    volume: "$4.4B",
    color: "#23292F",
  },
  {
    rank: 2,
    name: "Chainlink",
    symbol: "LINK",
    price: 9.2303,
    change24h: 6.9,
    mcap: "$6.5B",
    volume: "$600.6M",
    color: "#2A5ADA",
  },
  {
    rank: 3,
    name: "Tether Gold",
    symbol: "XAUT",
    price: 5152.4,
    change24h: 0.01,
    mcap: "$2.6B",
    volume: "$377.2M",
    color: "#C9A447",
  },
  {
    rank: 4,
    name: "PAX Gold",
    symbol: "PAXG",
    price: 5185.2,
    change24h: -0.02,
    mcap: "$2.4B",
    volume: "$364M",
    color: "#E4A834",
  },
  {
    rank: 5,
    name: "Aster",
    symbol: "ASTR",
    price: 0.7133,
    change24h: 2.58,
    mcap: "$1.7B",
    volume: "$120.3M",
    color: "#70503D",
  },
]

export const topMoversStocks: TrendingToken[] = [
  {
    rank: 1,
    name: "Circle Internet Group (Ondo...)",
    symbol: "CRCL",
    price: 82.558,
    change24h: 19.75,
    mcap: "$61.1M",
    volume: "$13.4M",
    color: "#8B5CF6",
  },
  {
    rank: 2,
    name: "iShares Silver Trust (On...)",
    symbol: "SLV",
    price: 79.305,
    change24h: -2.81,
    mcap: "$37.9M",
    volume: "$10.7M",
    color: "#D97706",
  },
  {
    rank: 3,
    name: "Alphabet Class A (Ondo Tok...)",
    symbol: "GOOGL",
    price: 312.19,
    change24h: -0.14,
    mcap: "$52.8M",
    volume: "$1.7M",
    color: "#4285F4",
  },
  {
    rank: 4,
    name: "Micron Technology (Ondo T...)",
    symbol: "MU",
    price: 431.14,
    change24h: -1.21,
    mcap: "$28.5M",
    volume: "$5.2M",
    color: "#1E3A5F",
  },
]

export const topMoversMemes: TrendingToken[] = [
  {
    rank: 1,
    name: "Pepe",
    symbol: "PEPE",
    price: 0.00001234,
    change24h: 15.2,
    mcap: "$5.2B",
    volume: "$1.8B",
    color: "#3E9B4F",
  },
  {
    rank: 2,
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.13,
    change24h: 3.1,
    mcap: "$18.5B",
    volume: "$800M",
    color: "#C2A633",
  },
  {
    rank: 3,
    name: "Shiba Inu",
    symbol: "SHIB",
    price: 0.0000085,
    change24h: -1.5,
    mcap: "$5B",
    volume: "$300M",
    color: "#FFA500",
  },
]

export const quickActions = [
  { label: "Send", icon: "send" },
  { label: "Fund", icon: "plus" },
  { label: "Swap", icon: "swap" },
  { label: "Sell", icon: "sell" },
] as const

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
