"use client"

import { Home, TrendingUp, Gift, Compass, ArrowRightLeft } from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "trade", label: "Trade", icon: ArrowRightLeft },
  { id: "rewards", label: "Rewards", icon: Gift },
  { id: "discover", label: "Discover", icon: Compass },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background" role="navigation" aria-label="Main navigation">
      <div className="mx-auto flex max-w-md items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          const isTrade = item.id === "trade"

          if (isTrade) {
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="relative -mt-6 flex flex-col items-center gap-0.5"
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </button>
            )
          }

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-0.5 px-3 py-1"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive ? (
                <div className="flex h-10 w-16 items-center justify-center rounded-full bg-primary/20">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
              ) : (
                <div className="flex h-10 w-16 items-center justify-center">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
              <span className={`text-xs ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
