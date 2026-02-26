"use client"

import { useState } from "react"
import { PinLogin } from "@/components/wallet/pin-login"
import { BottomNav } from "@/components/wallet/bottom-nav"
import { HomeScreen } from "@/components/wallet/home-screen"
import { TrendingScreen } from "@/components/wallet/trending-screen"
import { SwapScreen } from "@/components/wallet/swap-screen"
import { SendScreen } from "@/components/wallet/send-screen"
import { SendAmountScreen } from "@/components/wallet/send-amount-screen"
import { ReceiveScreen } from "@/components/wallet/receive-screen"
import { RewardsScreen } from "@/components/wallet/rewards-screen"
import { SettingsScreen } from "@/components/wallet/settings-screen"
import { DiscoverScreen } from "@/components/wallet/discover-screen"
import { TokenDetail } from "@/components/wallet/token-detail"
import { cryptoAssets } from "@/lib/wallet-data"
import type { CryptoAsset } from "@/lib/wallet-data"

type Page =
  | "home"
  | "trending"
  | "trade"
  | "rewards"
  | "discover"
  | "swap"
  | "send"
  | "send-amount"
  | "receive"
  | "settings"
  | "token-detail"

export default function WalletApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [pageHistory, setPageHistory] = useState<Page[]>(["home"])
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null)

  const navigateTo = (page: string, asset?: CryptoAsset) => {
    setPageHistory((prev) => [...prev, currentPage])
    setCurrentPage(page as Page)
    if (asset) setSelectedAsset(asset)
  }

  const goBack = () => {
    setPageHistory((prev) => {
      const newHistory = [...prev]
      const previousPage = newHistory.pop() || "home"
      setCurrentPage(previousPage)
      return newHistory
    })
  }

  const goHome = () => {
    setPageHistory(["home"])
    setCurrentPage("home")
  }

  if (!isAuthenticated) {
    return (
      <main className="mx-auto min-h-screen max-w-md bg-background">
        <PinLogin onSuccess={() => setIsAuthenticated(true)} />
      </main>
    )
  }

  const subPages: Page[] = ["swap", "send", "send-amount", "receive", "settings", "token-detail"]
  const isSubPage = subPages.includes(currentPage)
  const mainTab = isSubPage
    ? (pageHistory.findLast((p) => !subPages.includes(p)) || "home")
    : currentPage

  return (
    <main className="mx-auto min-h-screen max-w-md bg-background">
      {currentPage === "home" && (
        <HomeScreen
          onNavigate={navigateTo}
          onTokenSelect={(asset) => navigateTo("token-detail", asset)}
        />
      )}
      {currentPage === "trending" && <TrendingScreen />}
      {currentPage === "trade" && <SwapScreen onBack={goBack} />}
      {currentPage === "swap" && <SwapScreen onBack={goBack} />}
      {currentPage === "send" && (
        <SendScreen
          onBack={goBack}
          onSelectCrypto={(asset) => navigateTo("send-amount", asset)}
        />
      )}
      {currentPage === "send-amount" && selectedAsset && (
        <SendAmountScreen asset={selectedAsset} onBack={goBack} onComplete={goHome} />
      )}
      {currentPage === "receive" && <ReceiveScreen onBack={goBack} />}
      {currentPage === "rewards" && <RewardsScreen />}
      {currentPage === "discover" && <DiscoverScreen />}
      {currentPage === "settings" && <SettingsScreen onBack={goBack} />}
      {currentPage === "token-detail" && selectedAsset && (
        <TokenDetail
          asset={selectedAsset}
          onBack={goBack}
          onSend={() => navigateTo("send-amount", selectedAsset)}
          onReceive={() => navigateTo("receive")}
          onSwap={() => navigateTo("swap")}
        />
      )}

      {!isSubPage && (
        <BottomNav activeTab={mainTab} onTabChange={(tab) => navigateTo(tab)} />
      )}
    </main>
  )
}
