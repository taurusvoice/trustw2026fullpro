"use client"

import { useState } from "react"
import { ArrowLeft, ScanLine, BookOpen, Check } from "lucide-react"
import type { CryptoAsset } from "@/lib/wallet-data"
import { CryptoIcon } from "./crypto-icon"

interface SendAmountScreenProps {
  asset: CryptoAsset
  onBack: () => void
  onComplete: () => void
}

export function SendAmountScreen({ asset, onBack, onComplete }: SendAmountScreenProps) {
  const [step, setStep] = useState<"address" | "amount" | "confirm" | "success">("address")
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [sending, setSending] = useState(false)

  const numAmount = parseFloat(amount) || 0
  const usdValue = numAmount * asset.price
  const hasEnoughBalance = numAmount <= asset.balance

  if (step === "success") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
          <Check className="h-10 w-10 text-primary" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-foreground">Transaction Sent</h2>
        <p className="mb-1 text-sm text-muted-foreground">
          {amount} {asset.symbol} sent to
        </p>
        <p className="mb-8 text-xs text-muted-foreground">{address.slice(0, 20)}...{address.slice(-8)}</p>
        <button
          onClick={onComplete}
          className="w-full rounded-2xl bg-primary py-4 text-base font-semibold text-primary-foreground"
        >
          Done
        </button>
      </div>
    )
  }

  if (step === "confirm") {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center px-4 pt-4 pb-3">
          <button onClick={() => setStep("amount")} className="text-foreground" aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-foreground">Confirm</h1>
          <div className="w-5" />
        </div>

        <div className="flex-1 px-4 pt-6">
          {/* Amount Display */}
          <div className="mb-8 flex flex-col items-center">
            <CryptoIcon symbol={asset.symbol} color={asset.color} size="lg" />
            <p className="mt-4 text-3xl font-bold text-foreground">
              {amount} {asset.symbol}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              ${usdValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          {/* Details */}
          <div className="rounded-xl bg-secondary p-4">
            <div className="flex justify-between border-b border-border py-3">
              <span className="text-sm text-muted-foreground">Asset</span>
              <span className="text-sm font-medium text-foreground">{asset.symbol}</span>
            </div>
            <div className="flex justify-between border-b border-border py-3">
              <span className="text-sm text-muted-foreground">Network</span>
              <span className="text-sm font-medium text-foreground">{asset.network}</span>
            </div>
            <div className="flex justify-between border-b border-border py-3">
              <span className="text-sm text-muted-foreground">To</span>
              <span className="text-sm font-medium text-foreground">
                {address.slice(0, 10)}...{address.slice(-6)}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-sm text-muted-foreground">Network Fee</span>
              <span className="text-sm font-medium text-foreground">~$0.50</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={() => {
              setSending(true)
              setTimeout(() => {
                setSending(false)
                setStep("success")
              }, 1500)
            }}
            disabled={sending}
            className="w-full rounded-2xl bg-primary py-4 text-base font-semibold text-primary-foreground disabled:opacity-50"
          >
            {sending ? "Sending..." : "Confirm & Send"}
          </button>
        </div>
      </div>
    )
  }

  if (step === "amount") {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center px-4 pt-4 pb-3">
          <button onClick={() => setStep("address")} className="text-foreground" aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-foreground">
            Send {asset.symbol}
          </h1>
          <div className="w-5" />
        </div>

        <div className="flex-1 px-4 pt-6">
          <div className="flex flex-col items-center">
            <CryptoIcon symbol={asset.symbol} color={asset.color} size="lg" />
            <div className="mt-6 flex items-center gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-40 bg-transparent text-center text-4xl font-bold text-foreground outline-none placeholder:text-muted-foreground"
                autoFocus
                step="any"
              />
              <span className="text-lg text-muted-foreground">{asset.symbol}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              ${usdValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <button
              onClick={() => setAmount(String(asset.balance))}
              className="mt-3 rounded-full bg-primary/20 px-4 py-1 text-xs font-medium text-primary"
            >
              Max: {asset.balance} {asset.symbol}
            </button>
            {!hasEnoughBalance && numAmount > 0 && (
              <p className="mt-2 text-xs text-destructive">Insufficient balance</p>
            )}
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={() => setStep("confirm")}
            disabled={!numAmount || !hasEnoughBalance}
            className="w-full rounded-2xl bg-primary py-4 text-base font-semibold text-primary-foreground disabled:opacity-30"
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  // Address step
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center px-4 pt-4 pb-3">
        <button onClick={onBack} className="text-foreground" aria-label="Go back">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-foreground">
          Send {asset.symbol}
        </h1>
        <div className="w-5" />
      </div>

      <div className="flex-1 px-4 pt-4">
        <p className="mb-3 text-sm text-muted-foreground">Recipient address</p>
        <div className="flex items-center gap-2 rounded-xl bg-secondary p-3">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter or paste address"
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <button className="text-muted-foreground" aria-label="Scan QR code">
            <ScanLine className="h-5 w-5" />
          </button>
          <button className="text-muted-foreground" aria-label="Address book">
            <BookOpen className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm text-muted-foreground">or select from recent</p>
          {["0x91dBeFC38A425EaE9Af6867aD6eD1db7fbD7155F", "0xAbC123...dEf456"].map((addr) => (
            <button
              key={addr}
              onClick={() => setAddress(addr)}
              className="flex w-full items-center gap-3 rounded-xl py-3 text-left transition-colors active:bg-secondary/50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs text-muted-foreground">
                {addr.slice(2, 4)}
              </div>
              <span className="text-sm text-foreground">{addr.slice(0, 16)}...{addr.slice(-6)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={() => setStep("amount")}
          disabled={!address}
          className="w-full rounded-2xl bg-primary py-4 text-base font-semibold text-primary-foreground disabled:opacity-30"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
