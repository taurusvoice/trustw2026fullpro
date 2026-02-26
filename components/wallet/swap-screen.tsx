"use client"

import { useState } from "react"
import { ArrowLeft, Clock, SlidersHorizontal, ChevronRight, ArrowDownUp, Copy, Check } from "lucide-react"
import { CryptoIcon } from "./crypto-icon"
import { cryptoAssets } from "@/lib/wallet-data"

interface TokenOption {
  symbol: string
  name: string
  color: string
  balance: number
  price: number
}

export function SwapScreen({ onBack }: { onBack: () => void }) {
  const [fromToken, setFromToken] = useState<TokenOption>({
    symbol: "BNB",
    name: "BNB Smart Chain",
    color: "#F3BA2F",
    balance: 3.2,
    price: 600,
  })
  const [toToken, setToToken] = useState<TokenOption>({
    symbol: "TWT",
    name: "Trust Wallet Token",
    color: "#3375BB",
    balance: 500,
    price: 1.25,
  })
  const [fromAmount, setFromAmount] = useState("")
  const [showTokenPicker, setShowTokenPicker] = useState<"from" | "to" | null>(null)
  const [slippage, setSlippage] = useState(2)
  const [showSlippage, setShowSlippage] = useState(false)
  const [swapSuccess, setSwapSuccess] = useState(false)

  const numFrom = parseFloat(fromAmount) || 0
  const toAmount = numFrom > 0 ? ((numFrom * fromToken.price) / toToken.price).toFixed(6) : ""
  const usdValue = numFrom * fromToken.price

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount("")
  }

  const handleSwap = () => {
    if (numFrom > 0 && numFrom <= fromToken.balance) {
      setSwapSuccess(true)
      setTimeout(() => {
        setSwapSuccess(false)
        setFromAmount("")
      }, 2000)
    }
  }

  if (showTokenPicker) {
    const side = showTokenPicker
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center px-4 pt-4 pb-3">
          <button onClick={() => setShowTokenPicker(null)} className="text-foreground" aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-foreground">
            Select Token
          </h1>
          <div className="w-5" />
        </div>
        <div className="flex-1 overflow-y-auto">
          {cryptoAssets.map((asset) => (
            <button
              key={asset.symbol}
              onClick={() => {
                const newToken: TokenOption = {
                  symbol: asset.symbol,
                  name: asset.name,
                  color: asset.color,
                  balance: asset.balance,
                  price: asset.price,
                }
                if (side === "from") setFromToken(newToken)
                else setToToken(newToken)
                setShowTokenPicker(null)
                setFromAmount("")
              }}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-secondary/50"
            >
              <CryptoIcon symbol={asset.symbol} color={asset.color} />
              <div className="flex-1">
                <span className="font-medium text-foreground">{asset.symbol}</span>
                <p className="text-xs text-muted-foreground">{asset.name}</p>
              </div>
              <span className="text-sm text-muted-foreground">
                {asset.balance} {asset.symbol}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (showSlippage) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center px-4 pt-4 pb-3">
          <button onClick={() => setShowSlippage(false)} className="text-foreground" aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-foreground">Slippage Tolerance</h1>
          <div className="w-5" />
        </div>
        <div className="flex gap-3 px-4 pt-6">
          {[0.5, 1, 2, 3, 5].map((val) => (
            <button
              key={val}
              onClick={() => {
                setSlippage(val)
                setShowSlippage(false)
              }}
              className={`flex-1 rounded-xl py-3 text-sm font-medium ${
                slippage === val
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              }`}
            >
              {val}%
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-4">
        <button onClick={onBack} className="text-foreground" aria-label="Go back">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Swap</h1>
        <div className="flex items-center gap-3">
          <button className="text-muted-foreground" aria-label="History">
            <Clock className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowSlippage(true)}
            className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs text-foreground"
            aria-label="Slippage settings"
          >
            <SlidersHorizontal className="h-3 w-3" />
            <span>{slippage}%</span>
          </button>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="mx-4 mb-4 flex items-center justify-between rounded-full bg-primary px-5 py-3">
        <span className="text-sm font-medium text-primary-foreground">NEW: Prediction markets</span>
        <button className="rounded-full bg-foreground/20 px-3 py-1 text-xs text-primary-foreground">
          Start now
        </button>
      </div>

      {/* From Card */}
      <div className="mx-4 rounded-xl bg-secondary p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">From</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{fromToken.balance}</span>
            <button
              onClick={() => setFromAmount(String(fromToken.balance))}
              className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary"
            >
              Max
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CryptoIcon symbol={fromToken.symbol} color={fromToken.color} size="lg" />
          <div className="flex-1">
            <button
              onClick={() => setShowTokenPicker("from")}
              className="flex items-center gap-1"
            >
              <span className="text-lg font-bold text-foreground">{fromToken.symbol}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            <p className="text-xs text-muted-foreground">{fromToken.name}</p>
          </div>
          <div className="text-right">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0"
              className="w-24 bg-transparent text-right text-2xl font-bold text-foreground outline-none placeholder:text-muted-foreground"
              step="any"
            />
            <p className="text-xs text-muted-foreground">
              ${usdValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="relative z-10 -my-3 flex justify-center">
        <button
          onClick={handleSwapTokens}
          className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-secondary text-foreground transition-transform active:rotate-180"
        >
          <ArrowDownUp className="h-4 w-4" />
        </button>
      </div>

      {/* To Card */}
      <div className="mx-4 rounded-xl bg-secondary p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">To</span>
          <span className="text-sm text-muted-foreground">{toToken.balance}</span>
        </div>
        <div className="flex items-center gap-3">
          <CryptoIcon symbol={toToken.symbol} color={toToken.color} size="lg" />
          <div className="flex-1">
            <button
              onClick={() => setShowTokenPicker("to")}
              className="flex items-center gap-1"
            >
              <span className="text-lg font-bold text-foreground">{toToken.symbol}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            <p className="text-xs text-muted-foreground">{toToken.name}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{toAmount || "0"}</p>
            <p className="text-xs text-muted-foreground">
              ${(parseFloat(toAmount || "0") * toToken.price).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Rate Info */}
      {numFrom > 0 && (
        <div className="mx-4 mt-3 rounded-xl bg-secondary/50 p-3">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Rate</span>
            <span className="text-foreground">
              1 {fromToken.symbol} = {(fromToken.price / toToken.price).toFixed(4)} {toToken.symbol}
            </span>
          </div>
          <div className="mt-1 flex justify-between text-xs">
            <span className="text-muted-foreground">Slippage</span>
            <span className="text-foreground">{slippage}%</span>
          </div>
          <div className="mt-1 flex justify-between text-xs">
            <span className="text-muted-foreground">Network Fee</span>
            <span className="text-foreground">~$0.30</span>
          </div>
        </div>
      )}

      {/* Success Message */}
      {swapSuccess && (
        <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl bg-primary/20 p-3">
          <Check className="h-5 w-5 text-primary" />
          <span className="text-sm text-primary">Swap submitted successfully!</span>
        </div>
      )}

      {/* Continue Button */}
      <div className="mt-auto p-4">
        <button
          onClick={handleSwap}
          disabled={!numFrom || numFrom > fromToken.balance}
          className="w-full rounded-2xl bg-primary py-4 text-center text-base font-semibold text-primary-foreground disabled:opacity-30"
        >
          {numFrom > fromToken.balance ? "Insufficient Balance" : "Swap"}
        </button>
      </div>
    </div>
  )
}
