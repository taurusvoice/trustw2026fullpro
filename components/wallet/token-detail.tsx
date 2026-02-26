"use client"

import { useState } from "react"
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, RefreshCw, MoreHorizontal } from "lucide-react"
import type { CryptoAsset } from "@/lib/wallet-data"
import { CryptoIcon } from "./crypto-icon"

interface TokenDetailProps {
  asset: CryptoAsset
  onBack: () => void
  onSend: () => void
  onReceive: () => void
  onSwap: () => void
}

export function TokenDetail({ asset, onBack, onSend, onReceive, onSwap }: TokenDetailProps) {
  const [timeframe, setTimeframe] = useState<"1H" | "1D" | "1W" | "1M" | "1Y" | "ALL">("1D")

  // Generate fake chart data
  const chartPoints = Array.from({ length: 40 }, (_, i) => {
    const base = asset.price
    const noise = (Math.random() - 0.5) * base * 0.08
    return base + noise + (i * base * 0.001 * (asset.change24h >= 0 ? 1 : -1))
  })

  const min = Math.min(...chartPoints)
  const max = Math.max(...chartPoints)
  const range = max - min || 1

  const pathD = chartPoints
    .map((point, i) => {
      const x = (i / (chartPoints.length - 1)) * 320
      const y = 100 - ((point - min) / range) * 80
      return `${i === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  const isPositive = asset.change24h >= 0

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button onClick={onBack} className="text-foreground" aria-label="Go back">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <CryptoIcon symbol={asset.symbol} color={asset.color} size="sm" />
          <span className="text-base font-bold text-foreground">{asset.symbol}</span>
        </div>
        <button className="text-muted-foreground" aria-label="More options">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Price Section */}
      <div className="px-4 py-4">
        <p className="text-3xl font-bold text-foreground">
          ${asset.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className={`text-sm ${isPositive ? "text-primary" : "text-destructive"}`}>
          {isPositive ? "+" : ""}
          {asset.change24h}% today
        </p>
      </div>

      {/* Chart */}
      <div className="px-4 py-2">
        <svg viewBox="0 0 320 120" className="w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`grad-${asset.symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? "#2ecc71" : "#ef4444"} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? "#2ecc71" : "#ef4444"} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${pathD} L 320 120 L 0 120 Z`} fill={`url(#grad-${asset.symbol})`} />
          <path
            d={pathD}
            fill="none"
            stroke={isPositive ? "#2ecc71" : "#ef4444"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2 px-4 py-3">
        {(["1H", "1D", "1W", "1M", "1Y", "ALL"] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors ${
              timeframe === tf
                ? "bg-secondary text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Balance */}
      <div className="mx-4 mt-4 rounded-xl bg-secondary p-4">
        <p className="text-sm text-muted-foreground">Your Balance</p>
        <p className="mt-1 text-2xl font-bold text-foreground">
          ${asset.balanceUSD.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <p className="text-sm text-muted-foreground">
          {asset.balance} {asset.symbol}
        </p>
      </div>

      {/* Info Section */}
      <div className="mx-4 mt-4 rounded-xl bg-secondary p-4">
        <h3 className="mb-3 text-sm font-medium text-foreground">About {asset.name}</h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Network</span>
            <span className="text-xs text-foreground">{asset.network}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Price</span>
            <span className="text-xs text-foreground">${asset.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">24h Change</span>
            <span className={`text-xs ${isPositive ? "text-primary" : "text-destructive"}`}>
              {isPositive ? "+" : ""}{asset.change24h}%
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex gap-3 p-4">
        <button
          onClick={onSend}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-secondary py-3.5 text-sm font-medium text-foreground transition-colors active:bg-secondary/70"
        >
          <ArrowUpRight className="h-4 w-4" />
          Send
        </button>
        <button
          onClick={onReceive}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-secondary py-3.5 text-sm font-medium text-foreground transition-colors active:bg-secondary/70"
        >
          <ArrowDownLeft className="h-4 w-4" />
          Receive
        </button>
        <button
          onClick={onSwap}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-colors active:bg-primary/80"
        >
          <RefreshCw className="h-4 w-4" />
          Swap
        </button>
      </div>
    </div>
  )
}
