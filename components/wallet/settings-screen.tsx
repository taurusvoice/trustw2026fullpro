"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Moon,
  BookOpen,
  Grid3X3,
  AtSign,
  ScanLine,
  Link2,
  Settings,
  Lock,
  Bell,
  HelpCircle,
  Headphones,
  ShieldCheck,
  Twitter,
  Send,
  Facebook,
  MessageSquare,
  Youtube,
  Instagram,
  Music2,
  ChevronRight,
} from "lucide-react"

interface SettingsItem {
  icon: React.ElementType
  label: string
  hasToggle?: boolean
  defaultToggle?: boolean
}

export function SettingsScreen({ onBack }: { onBack: () => void }) {
  const [darkMode, setDarkMode] = useState(true)

  const premiumSection: SettingsItem[] = []

  const mainSettings: SettingsItem[] = [
    { icon: Moon, label: "Dark Mode", hasToggle: true, defaultToggle: true },
  ]

  const generalSettings: SettingsItem[] = [
    { icon: BookOpen, label: "Address Book" },
    { icon: Grid3X3, label: "Sync to Extension" },
    { icon: AtSign, label: "Trust handles" },
    { icon: ScanLine, label: "Scan QR code" },
    { icon: Link2, label: "WalletConnect" },
  ]

  const appSettings: SettingsItem[] = [
    { icon: Settings, label: "Preferences" },
    { icon: Lock, label: "Security" },
    { icon: Bell, label: "Notifications" },
  ]

  const helpSettings: SettingsItem[] = [
    { icon: HelpCircle, label: "Help Center" },
    { icon: Headphones, label: "Support" },
    { icon: ShieldCheck, label: "About" },
  ]

  const socialLinks: SettingsItem[] = [
    { icon: Twitter, label: "X" },
    { icon: Send, label: "Telegram" },
    { icon: Facebook, label: "Facebook" },
    { icon: MessageSquare, label: "Reddit" },
    { icon: Youtube, label: "Youtube" },
    { icon: Instagram, label: "Instagram" },
    { icon: Music2, label: "TikTok" },
  ]

  const renderSettingsGroup = (items: SettingsItem[], showDivider = true) => (
    <>
      {items.map((item) => (
        <button
          key={item.label}
          className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors active:bg-secondary/50"
        >
          <item.icon className="h-5 w-5 text-muted-foreground" />
          <span className="flex-1 text-sm text-foreground">{item.label}</span>
          {item.hasToggle ? (
            <div
              role="switch"
              aria-checked={darkMode}
              onClick={(e) => {
                e.stopPropagation()
                setDarkMode(!darkMode)
              }}
              className={`flex h-7 w-12 cursor-pointer items-center rounded-full px-0.5 transition-colors ${
                darkMode ? "bg-primary" : "bg-secondary"
              }`}
            >
              <div
                className={`h-6 w-6 rounded-full bg-foreground shadow-sm transition-transform ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      ))}
      {showDivider && <div className="mx-4 border-b border-border" />}
    </>
  )

  return (
    <div className="flex min-h-screen flex-col pb-20">
      {/* Header */}
      <div className="flex items-center px-4 pt-4 pb-3">
        <button onClick={onBack} className="text-foreground" aria-label="Go back">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-foreground">Settings</h1>
        <div className="w-5" />
      </div>

      {/* Trust Premium */}
      <div className="px-4 pb-3">
        <h2 className="mb-2 text-sm font-bold text-foreground">Trust Premium</h2>
        <div className="flex items-center gap-3 rounded-xl border border-border p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-xl">
            {"🏆"}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Level up</p>
            <p className="text-xs text-muted-foreground">Unlock exclusive rewards</p>
          </div>
          <button className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground">
            Begin
          </button>
        </div>
      </div>

      {/* Settings Groups */}
      {renderSettingsGroup(mainSettings)}
      {renderSettingsGroup(generalSettings)}
      {renderSettingsGroup(appSettings)}
      {renderSettingsGroup(helpSettings)}
      {renderSettingsGroup(socialLinks, false)}
    </div>
  )
}
