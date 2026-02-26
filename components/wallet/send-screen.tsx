"use client"

import { useState } from "react"
import { ArrowLeft, Search } from "lucide-react"
import { cryptoAssets, networkFilters } from "@/lib/wallet-data"
import type { CryptoAsset } from "@/lib/wallet-data"
import { CryptoIcon } from "./crypto-icon"

interface SendScreenProps {
  onBack: () => void
  onSelectCrypto: (asset: CryptoAsset) => void
}

export function SendScreen({ onBack, onSelectCrypto }: SendScreenProps) {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAssets = cryptoAssets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      activeFilter === "All" ||
      asset.symbol === activeFilter ||
      asset.network.includes(activeFilter)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <button onClick={onBack} className="text-foreground" aria-label="Go back">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Select Crypto</h1>
        <div className="w-5" />
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Network Filters */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-4 scrollbar-hide">
        {networkFilters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.label)}
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              activeFilter === filter.label ? "ring-2 ring-primary" : ""
            }`}
            style={{ backgroundColor: filter.color + "33", color: filter.color }}
          >
            {filter.label.slice(0, 2)}
          </button>
        ))}
      </div>

      {/* All crypto label */}
      <p className="px-4 pb-2 text-sm text-muted-foreground">All crypto</p>

      {/* Crypto List */}
      <div className="flex-1 overflow-y-auto">
        {filteredAssets.map((asset) => (
          <button
            key={asset.symbol}
            onClick={() => onSelectCrypto(asset)}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-secondary/50"
          >
            <CryptoIcon symbol={asset.symbol} color={asset.color} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{asset.symbol}</span>
                <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  {asset.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{asset.network}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-foreground">${asset.balanceUSD.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">
                {asset.balance} {asset.symbol}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
