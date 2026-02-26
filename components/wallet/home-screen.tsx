"use client"

import { useState } from "react"
import { Search, Settings, SlidersHorizontal, ArrowUpRight, Plus, RefreshCw, Landmark, ChevronRight, Copy, Clock, X, Check, Eye, EyeOff } from "lucide-react"
import { useWallet, topMoversStocks, topMoversMemes, topMoversAI } from "@/lib/wallet-context"
import type { CryptoAsset } from "@/lib/wallet-context"
import { CryptoIcon } from "./crypto-icon"

type HomeTab = "crypto" | "prediction" | "watchlist"
type MoverCategory = "stocks" | "memes" | "x402" | "ai"

interface HomeScreenProps {
  onNavigate: (page: string) => void
  onTokenSelect: (asset: CryptoAsset) => void
}

export function HomeScreen({ onNavigate, onTokenSelect }: HomeScreenProps) {
  const { assets, totalBalance, transactions, hideSmallBalances, walletName } = useWallet()
  const [activeTab, setActiveTab] = useState<HomeTab>("crypto")
  const [moverCategory, setMoverCategory] = useState<MoverCategory>("stocks")
  const [showBanner, setShowBanner] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showBalance, setShowBalance] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const movers =
    moverCategory === "stocks" ? topMoversStocks :
    moverCategory === "memes" ? topMoversMemes :
    moverCategory === "ai" ? topMoversAI :
    topMoversStocks

  const displayAssets = assets.filter((a) => {
    if (hideSmallBalances && a.balanceUSD < 0.01) return false
    if (searchQuery) {
      return a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             a.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    }
    return true
  })

  const recentTxs = transactions.slice(0, 5)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0x91dBeFC38A425EaE9Af6867aD6eD1db7fbD7155F").catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4">
        <button onClick={() => onNavigate("settings")} className="text-muted-foreground" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </button>
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="flex flex-1 items-center gap-2 rounded-lg bg-secondary px-3 py-2.5"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search</span>
        </button>
        <button onClick={() => onNavigate("manage-crypto")} className="text-muted-foreground" aria-label="Filters">
          <SlidersHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Search Bar (toggled) */}
      {showSearch && (
        <div className="px-4 pt-3">
          <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tokens..."
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(""); setShowSearch(false) }}>
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Wallet Selector */}
      <div className="flex items-center justify-center gap-2 py-4">
        <button className="flex items-center gap-1 rounded-full bg-secondary px-4 py-1.5">
          <span className="text-sm text-foreground">{walletName}</span>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
        </button>
        <button onClick={handleCopyAddress} className="relative" aria-label="Copy wallet address">
          <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-destructive" />
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Balance */}
      <div className="flex items-center justify-center gap-3 pb-2">
        <p className="text-3xl font-bold text-foreground">
          {showBalance
            ? `$${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : "********"}
        </p>
        <button onClick={() => setShowBalance(!showBalance)} aria-label="Toggle balance visibility">
          {showBalance ? (
            <Eye className="h-5 w-5 text-muted-foreground" />
          ) : (
            <EyeOff className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-center gap-6 py-4">
        {[
          { icon: ArrowUpRight, label: "Send", page: "send" },
          { icon: Plus, label: "Fund", page: "receive" },
          { icon: RefreshCw, label: "Swap", page: "swap" },
          { icon: Landmark, label: "Sell", page: "sell" },
        ].map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center gap-1.5"
            onClick={() => onNavigate(action.page)}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <action.icon className="h-5 w-5 text-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Banner */}
      {showBanner && (
        <div className="mx-4 mb-3 flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trust-wallet-icon%20%283%29-Tt3k9XHOkDubKiF6OWWoDdVrGTQjqx.webp"
              alt="Trust Wallet"
              className="h-10 w-10 rounded-lg"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Back up to secure your assets</p>
            <button className="text-xs text-primary">{"Back up wallet ->"}</button>
          </div>
          <button onClick={() => setShowBanner(false)} className="text-muted-foreground" aria-label="Dismiss banner">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-border px-4">
        {(["crypto", "prediction", "watchlist"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm capitalize ${
              activeTab === tab
                ? "border-b-2 border-primary font-medium text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={() => onNavigate("history")} className="pb-3 text-muted-foreground" aria-label="History">
          <Clock className="h-4 w-4" />
        </button>
        <button className="pb-3 text-muted-foreground" aria-label="Filters">
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Crypto Tab Content */}
      {activeTab === "crypto" && (
        <div>
          {/* Token List */}
          <div>
            {displayAssets.map((asset) => (
              <button
                key={asset.symbol}
                onClick={() => onTokenSelect(asset)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors active:bg-secondary/50"
              >
                <CryptoIcon symbol={asset.symbol} color={asset.color} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-foreground">{asset.symbol}</span>
                    <span className="truncate rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {asset.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">${asset.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <span className={`text-[10px] ${asset.change24h >= 0 ? "text-primary" : "text-destructive"}`}>
                      {asset.change24h >= 0 ? "+" : ""}{asset.change24h}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">
                    {showBalance
                      ? `$${asset.balanceUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : "****"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {asset.balance.toLocaleString("en-US", { maximumFractionDigits: 6 })} {asset.symbol}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Prediction Tab */}
      {activeTab === "prediction" && (
        <div className="px-4 py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="font-medium text-foreground">Prediction markets</p>
          <p className="mt-1 text-sm text-muted-foreground">Coming soon - bet on real-world events</p>
        </div>
      )}

      {/* Watchlist Tab */}
      {activeTab === "watchlist" && (
        <div className="px-4 py-4">
          <p className="mb-4 text-sm text-muted-foreground">Your watched tokens</p>
          {assets.slice(0, 5).map((asset) => (
            <button
              key={asset.symbol}
              onClick={() => onTokenSelect(asset)}
              className="flex w-full items-center gap-3 py-3 text-left transition-colors active:bg-secondary/50"
            >
              <CryptoIcon symbol={asset.symbol} color={asset.color} size="sm" />
              <div className="flex-1">
                <span className="text-sm font-medium text-foreground">{asset.symbol}</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-foreground">${asset.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                <p className={`text-xs ${asset.change24h >= 0 ? "text-primary" : "text-destructive"}`}>
                  {asset.change24h >= 0 ? "+" : ""}{asset.change24h}%
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Top Movers Section */}
      <div className="mt-4 px-4">
        <h3 className="mb-3 text-lg font-bold text-foreground">Top movers</h3>
        <div className="rounded-xl bg-secondary p-3">
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
          <p className="py-2 text-xs text-muted-foreground">
            Top {moverCategory === "stocks" ? "stock-based" : moverCategory} tokens (24h % price change)
          </p>
          {movers.map((token) => (
            <div key={token.rank} className="flex items-center gap-3 py-3">
              <span className="w-4 text-sm text-muted-foreground">{token.rank}</span>
              <CryptoIcon symbol={token.symbol} color={token.color} size="sm" />
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-foreground">{token.name}</p>
                <p className="text-xs text-muted-foreground">
                  MCap: {token.mcap} . Vol: {token.volume}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  ${token.price < 0.01 ? token.price.toFixed(8) : token.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
                <p className={`text-xs ${token.change24h >= 0 ? "text-primary" : "text-destructive"}`}>
                  {token.change24h >= 0 ? "+" : ""}{token.change24h}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {recentTxs.length > 0 && (
        <div className="mt-6 px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
            <button onClick={() => onNavigate("history")} className="text-xs text-primary">View all</button>
          </div>
          {recentTxs.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 py-3 border-b border-border/30 last:border-0">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
                tx.type === "send" ? "bg-destructive/10" : tx.type === "receive" ? "bg-primary/10" : "bg-secondary"
              }`}>
                {tx.type === "send" && <ArrowUpRight className="h-4 w-4 text-destructive" />}
                {tx.type === "receive" && <Plus className="h-4 w-4 text-primary" />}
                {tx.type === "swap" && <RefreshCw className="h-4 w-4 text-foreground" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground capitalize">{tx.type} {tx.asset}</p>
                <p className="text-xs text-muted-foreground">
                  {tx.timestamp.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  {" "}
                  {tx.timestamp.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${tx.type === "receive" ? "text-primary" : "text-foreground"}`}>
                  {tx.type === "receive" ? "+" : "-"}{tx.amount.toLocaleString("en-US", { maximumFractionDigits: 6 })} {tx.asset}
                </p>
                <p className="text-xs text-muted-foreground">${tx.usdValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
