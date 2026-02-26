"use client"

import { Lock, Clock, ChevronRight, ArrowRight } from "lucide-react"

export function RewardsScreen() {
  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-center text-lg font-bold text-foreground">Rewards</h1>
      </div>

      {/* Hero Illustration */}
      <div className="flex justify-center py-6">
        <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-primary/10">
          <div className="text-5xl">{"🎁"}</div>
        </div>
      </div>

      {/* Level & XP */}
      <div className="flex gap-3 px-4 pb-6">
        <div className="flex-1 rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">Level</p>
          <p className="mt-1 text-sm font-medium text-foreground">100 XP to Bronze</p>
        </div>
        <div className="flex-1 rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">XP Balance</p>
          <p className="mt-1 text-sm font-medium text-foreground">0 XP</p>
        </div>
      </div>

      {/* Redeem XP */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-foreground">Redeem XP</h2>
          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="rounded bg-[#5C4813]/40 px-2 py-0.5 text-[10px] font-medium text-[#D4A537]">
            Bronze required
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Partner Benefits</p>
      </div>

      {/* Benefit Cards */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-6 pt-3 scrollbar-hide">
        {[
          { title: "$50 hotel coupon with Umy", xp: "800XP", bg: "#EC4899", icon: "🏨", amount: "$50" },
          { title: "40% off eSIM with TonMobile", xp: "400XP", bg: "#3B82F6", icon: "📱", amount: "40% OFF" },
          { title: "Free 3G (3 days) with...", xp: "1000XP", bg: "#059669", icon: "🌐", amount: "FREE" },
        ].map((benefit) => (
          <div key={benefit.title} className="flex-shrink-0">
            <div
              className="relative flex h-32 w-40 flex-col items-center justify-center rounded-xl"
              style={{ backgroundColor: benefit.bg }}
            >
              <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-foreground/20 px-2 py-0.5">
                <Clock className="h-3 w-3 text-foreground" />
                <span className="text-[10px] text-foreground">ENDED</span>
              </div>
              <span className="text-2xl">{benefit.icon}</span>
              <span className="mt-1 text-lg font-bold text-foreground">{benefit.amount}</span>
            </div>
            <p className="mt-2 w-40 text-xs text-foreground">{benefit.title}</p>
            <p className="font-bold text-foreground">{benefit.xp}</p>
            <button className="mt-2 w-full rounded-lg bg-primary/20 py-2 text-xs font-medium text-primary">
              View
            </button>
          </div>
        ))}
      </div>

      {/* Trust Alpha */}
      <div className="mx-4 mb-4">
        <div className="flex items-center gap-2 pb-3">
          <h2 className="text-base font-bold text-foreground">Trust Alpha</h2>
          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="rounded bg-[#5C4813]/40 px-2 py-0.5 text-[10px] font-medium text-[#D4A537]">
            Bronze required
          </span>
          <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Earn Card */}
      <div className="mx-4 rounded-xl border border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Earn ATWO with TWT</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>{"🎁"}</span> 5M ATWO
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> ENDED
              </div>
            </div>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD700]">
            <ArrowRight className="h-5 w-5 text-background" />
          </button>
        </div>
      </div>
    </div>
  )
}
