"use client"

import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { trendingTokens, topMoversStocks, topMoversMemes } from "@/lib/wallet-data"
import { CryptoIcon } from "./crypto-icon"

type MoverCategory = "stocks" | "memes" | "x402" | "ai"

export function TrendingScreen() {
  const [moverCategory, setMoverCategory] = useState<MoverCategory>("stocks")

  const movers = moverCategory === "stocks" ? topMoversStocks :
    moverCategory === "memes" ? topMoversMemes : topMoversStocks

  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-4">
        <div className="w-10" />
        <h1 className="text-lg font-bold text-foreground">Trending tokens</h1>
        <button className="text-muted-foreground" aria-label="Search">
          <Search className="h-5 w-5" />
        </button>
      </div>

      {/* Trending Section */}
      <div className="px-4">
        <h2 className="mb-4 text-lg font-bold text-foreground">Trending</h2>
        {trendingTokens.map((token) => (
          <div key={token.rank} className="flex items-center gap-3 py-4 border-b border-border/50 last:border-0">
            <span className="w-5 text-sm text-muted-foreground">{token.rank}</span>
            <CryptoIcon symbol={token.symbol} color={token.color} />
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-medium text-foreground">{token.name}</p>
              <p className="text-xs text-muted-foreground">
                MCap: {token.mcap} . Vol: {token.volume}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium text-foreground">${token.price.toLocaleString()}</p>
              <p className={`text-xs ${token.change24h >= 0 ? "text-primary" : "text-destructive"}`}>
                {token.change24h >= 0 ? "+" : ""}{token.change24h}%
              </p>
            </div>
          </div>
        ))}

        <div className="flex justify-center py-4">
          <button className="flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-sm text-foreground">
            View all
            <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
          </button>
        </div>
      </div>

      {/* Top Movers */}
      <div className="mt-4 px-4">
        <h2 className="mb-3 text-lg font-bold text-foreground">Top movers</h2>
        <div className="rounded-xl bg-secondary p-3">
          {/* Category Tabs */}
          <div className="flex gap-4 border-b border-border pb-2">
            {(["stocks", "memes", "x402", "ai"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setMoverCategory(cat)}
                className={`pb-1 text-sm capitalize ${
                  moverCategory === cat
                    ? "border-b-2 border-primary font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {cat === "ai" ? "AI" : cat}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between py-3">
            <button className="flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs text-foreground">
              All Networks
              <ChevronDown className="h-3 w-3" />
            </button>
            <button className="flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs text-foreground">
              24H
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>

          {/* Column Headers */}
          <div className="flex items-center px-1 pb-2 text-xs text-muted-foreground">
            <span className="flex-1">{"# Market cap | Volume"}</span>
            <span>% Price change</span>
          </div>

          {/* Token List */}
          {movers.map((token) => (
            <div key={token.rank} className="flex items-center gap-3 py-3.5 border-b border-border/30 last:border-0">
              <span className="w-4 text-sm text-muted-foreground">{token.rank}</span>
              <CryptoIcon symbol={token.symbol} color={token.color} />
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-foreground">{token.name}</p>
                <p className="text-xs text-muted-foreground">
                  MCap: {token.mcap} . Vol: {token.volume}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">${token.price.toLocaleString()}</p>
                <p className={`text-xs ${token.change24h >= 0 ? "text-primary" : "text-destructive"}`}>
                  {token.change24h >= 0 ? "+" : ""}{token.change24h}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
