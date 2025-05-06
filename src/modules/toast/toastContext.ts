import { createContext } from "react"

export type ToastContextType = {
  success: (msg: string) => void
  error: (msg: string) => void
  info: (msg: string) => void
}

export const ToastContext = createContext<ToastContextType | null>(null)
