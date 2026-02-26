"use client"

import { Search, Star, Compass, Zap, Shield, Layers } from "lucide-react"

const categories = [
  { icon: Star, label: "Popular", color: "#F59E0B" },
  { icon: Zap, label: "DeFi", color: "#2ecc71" },
  { icon: Layers, label: "NFTs", color: "#8B5CF6" },
  { icon: Shield, label: "Security", color: "#3B82F6" },
  { icon: Compass, label: "Games", color: "#EC4899" },
]

const dapps = [
  { name: "PancakeSwap", desc: "DEX on BNB Chain", category: "DeFi" },
  { name: "Uniswap", desc: "Leading DEX on Ethereum", category: "DeFi" },
  { name: "Aave", desc: "Lending & Borrowing", category: "DeFi" },
  { name: "OpenSea", desc: "NFT Marketplace", category: "NFTs" },
  { name: "1inch", desc: "DEX Aggregator", category: "DeFi" },
  { name: "Lido", desc: "Liquid Staking", category: "DeFi" },
]

export function DiscoverScreen() {
  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <div className="px-4 pt-4 pb-4">
        <h1 className="mb-4 text-lg font-bold text-foreground">Discover</h1>
        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search DApps</span>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.label}
            className="flex flex-shrink-0 flex-col items-center gap-2"
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: cat.color + "20" }}
            >
              <cat.icon className="h-6 w-6" style={{ color: cat.color }} />
            </div>
            <span className="text-xs text-muted-foreground">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Popular DApps */}
      <div className="px-4">
        <h2 className="mb-3 text-base font-bold text-foreground">Popular DApps</h2>
        {dapps.map((dapp) => (
          <button
            key={dapp.name}
            className="flex w-full items-center gap-3 py-3.5 text-left transition-colors active:bg-secondary/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-primary">
              {dapp.name.slice(0, 1)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{dapp.name}</p>
              <p className="text-xs text-muted-foreground">{dapp.desc}</p>
            </div>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] text-muted-foreground">
              {dapp.category}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
