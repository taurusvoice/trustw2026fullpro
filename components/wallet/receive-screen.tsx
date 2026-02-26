"use client"

import { useState } from "react"
import { ArrowLeft, Search, QrCode, Copy, Info, Globe, Share2, ArrowDown, Check } from "lucide-react"
import { cryptoAssets, networkFilters } from "@/lib/wallet-data"
import { CryptoIcon } from "./crypto-icon"

export function ReceiveScreen({ onBack }: { onBack: () => void }) {
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [copied, setCopied] = useState(false)

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

  const selectedAsset = cryptoAssets.find((a) => a.symbol === selectedCrypto)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (selectedAsset) {
    // Seed a deterministic random for the QR code pattern
    const qrSeed = selectedAsset.symbol.split("").reduce((a, b) => a + b.charCodeAt(0), 0)
    const qrPattern = Array.from({ length: 225 }, (_, i) => {
      const val = ((qrSeed * (i + 1) * 7) % 100)
      // Create finder patterns in corners
      const row = Math.floor(i / 15)
      const col = i % 15
      if ((row < 3 && col < 3) || (row < 3 && col > 11) || (row > 11 && col < 3)) return true
      return val > 45
    })

    return (
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <button onClick={() => { setSelectedCrypto(null); setCopied(false) }} className="text-foreground" aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Receive</h1>
          <button className="text-muted-foreground" aria-label="Info">
            <Info className="h-5 w-5" />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="mx-4 mb-6 rounded-xl bg-[#5C4813]/40 p-3">
          <div className="flex gap-2">
            <Info className="h-4 w-4 flex-shrink-0 text-[#D4A537]" />
            <p className="text-xs text-foreground">
              Only send <strong>{selectedAsset.name} ({selectedAsset.symbol})</strong> assets to this address.
              Other assets will be lost forever.
            </p>
          </div>
        </div>

        {/* QR Code Area */}
        <div className="flex flex-1 flex-col items-center px-4">
          {/* Token Label */}
          <div className="mb-6 flex items-center gap-2">
            <CryptoIcon symbol={selectedAsset.symbol} color={selectedAsset.color} size="sm" />
            <span className="text-xl font-bold text-foreground">{selectedAsset.symbol}</span>
            <span className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">COIN</span>
          </div>

          {/* QR Code */}
          <div className="mb-6 rounded-2xl bg-foreground p-5">
            <div className="grid h-52 w-52 grid-cols-15 gap-px">
              {qrPattern.map((filled, i) => (
                <div
                  key={i}
                  className={`aspect-square ${filled ? "bg-background" : "bg-foreground"}`}
                />
              ))}
            </div>
            <p className="mt-3 max-w-52 break-all text-center text-xs leading-relaxed text-background">
              {selectedAsset.address}
            </p>
            {(selectedAsset.network === "Solana" || selectedAsset.network === "Tron") && (
              <p className="mt-1 text-center text-xs text-background/60">No memo required</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6">
            <button
              onClick={() => handleCopy(selectedAsset.address)}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                {copied ? (
                  <Check className="h-5 w-5 text-primary" />
                ) : (
                  <Copy className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <span className="text-xs text-muted-foreground">{copied ? "Copied!" : "Copy"}</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                <Globe className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">Set Amount</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                <Share2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">Share</span>
            </button>
          </div>
        </div>

        {/* Deposit from exchange */}
        <div className="mx-4 mb-4 mt-6 flex items-center gap-3 rounded-xl bg-secondary p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
            <ArrowDown className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Deposit from exchange</p>
            <p className="text-xs text-muted-foreground">By direct transfer from your account</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <button onClick={onBack} className="text-foreground" aria-label="Go back">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Receive</h1>
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

      {/* Popular Label */}
      <p className="px-4 pb-2 text-sm text-muted-foreground">Popular</p>

      {/* Crypto List */}
      <div className="flex-1 overflow-y-auto">
        {filteredAssets.map((asset) => (
          <button
            key={asset.symbol}
            onClick={() => setSelectedCrypto(asset.symbol)}
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
              <p className="text-xs text-muted-foreground">{asset.address}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedCrypto(asset.symbol)
                }}
                className="text-muted-foreground"
                aria-label="QR code"
              >
                <QrCode className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleCopy(asset.address)
                }}
                className="text-muted-foreground"
                aria-label="Copy address"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
