"use client"

import { useState, useCallback } from "react"
import { Delete } from "lucide-react"

const CORRECT_PIN = "353535"

interface PinLoginProps {
  onSuccess: () => void
}

export function PinLogin({ onSuccess }: PinLoginProps) {
  const [pin, setPin] = useState("")
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  const handleKeyPress = useCallback(
    (digit: string) => {
      if (pin.length >= 6) return
      setError(false)

      const newPin = pin + digit
      setPin(newPin)

      if (newPin.length === 6) {
        if (newPin === CORRECT_PIN) {
          setTimeout(() => {
            onSuccess()
          }, 300)
        } else {
          setShaking(true)
          setError(true)
          setTimeout(() => {
            setPin("")
            setShaking(false)
          }, 600)
        }
      }
    },
    [pin, onSuccess]
  )

  const handleDelete = useCallback(() => {
    setPin((prev) => prev.slice(0, -1))
    setError(false)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-6">
      {/* Logo */}
      <div className="mt-16 mb-6 flex flex-col items-center">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trust-wallet-icon%20%283%29-Tt3k9XHOkDubKiF6OWWoDdVrGTQjqx.webp"
          alt="Trust Wallet"
          className="h-20 w-20 rounded-2xl"
        />
      </div>

      <h1 className="mb-2 text-xl font-bold text-foreground">Welcome Back</h1>
      <p className="mb-10 text-sm text-muted-foreground">Enter your passcode to unlock</p>

      {/* PIN Dots */}
      <div
        className={`mb-12 flex gap-4 ${shaking ? "animate-shake" : ""}`}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`h-3.5 w-3.5 rounded-full transition-all duration-200 ${
              i < pin.length
                ? error
                  ? "bg-destructive scale-110"
                  : "bg-primary scale-110"
                : "border-2 border-muted-foreground/40"
            }`}
          />
        ))}
      </div>

      {error && (
        <p className="mb-4 -mt-8 text-xs text-destructive">Incorrect passcode. Try again.</p>
      )}

      {/* Numpad */}
      <div className="mt-auto mb-12 grid w-full max-w-xs grid-cols-3 gap-4">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map(
          (key) => {
            if (key === "") {
              return <div key="empty" />
            }

            if (key === "del") {
              return (
                <button
                  key="del"
                  onClick={handleDelete}
                  className="flex h-16 items-center justify-center rounded-full text-foreground transition-colors active:bg-secondary"
                  aria-label="Delete"
                >
                  <Delete className="h-6 w-6" />
                </button>
              )
            }

            return (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="flex h-16 items-center justify-center rounded-full text-2xl font-medium text-foreground transition-colors active:bg-secondary"
              >
                {key}
              </button>
            )
          }
        )}
      </div>

      {/* Biometric hint */}
      <p className="mb-8 text-xs text-muted-foreground">
        Use passcode <span className="text-primary">353535</span> to unlock
      </p>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
