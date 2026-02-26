interface CryptoIconProps {
  symbol: string
  color: string
  size?: "sm" | "md" | "lg"
  networkBadge?: string
}

const cryptoLogos: Record<string, string> = {
  BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg",
  ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
  BNB: "https://cryptologos.cc/logos/bnb-bnb-logo.svg",
  SOL: "https://cryptologos.cc/logos/solana-sol-logo.svg",
  XRP: "https://cryptologos.cc/logos/xrp-xrp-logo.svg",
  DOGE: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg",
  ADA: "https://cryptologos.cc/logos/cardano-ada-logo.svg",
  TRX: "https://cryptologos.cc/logos/tron-trx-logo.svg",
  AVAX: "https://cryptologos.cc/logos/avalanche-avax-logo.svg",
  USDT: "https://cryptologos.cc/logos/tether-usdt-logo.svg",
  USDC: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg",
  LINK: "https://cryptologos.cc/logos/chainlink-link-logo.svg",
}

export function CryptoIcon({ symbol, color, size = "md", networkBadge }: CryptoIconProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  const textSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  const logoUrl = cryptoLogos[symbol]

  return (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} flex items-center justify-center rounded-full`}
        style={{ backgroundColor: color }}
        role="img"
        aria-label={`${symbol} icon`}
      >
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={symbol}
            className={`${size === "sm" ? "h-5 w-5" : size === "lg" ? "h-7 w-7" : "h-6 w-6"} rounded-full`}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = "none"
              const parent = target.parentElement
              if (parent) {
                const span = document.createElement("span")
                span.className = `font-bold text-foreground ${textSize[size]}`
                span.textContent = symbol.slice(0, 1)
                parent.appendChild(span)
              }
            }}
          />
        ) : (
          <span className={`font-bold text-foreground ${textSize[size]}`}>
            {symbol.slice(0, 1)}
          </span>
        )}
      </div>
      {networkBadge && (
        <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[8px] font-bold text-muted-foreground ring-1 ring-background">
          {networkBadge.slice(0, 1)}
        </div>
      )}
    </div>
  )
}
