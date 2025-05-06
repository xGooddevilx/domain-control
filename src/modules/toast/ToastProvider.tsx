// context/ToastContext.tsx
import { message } from 'antd'
import { useContext } from 'react'
import { ToastContext } from './toastContext'

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const toast = {
    success: (msg: string) => messageApi.success(msg),
    error: (msg: string) => messageApi.error(msg),
    info: (msg: string) => messageApi.info(msg),
  }

  return (
    <ToastContext.Provider value={toast}>
      {contextHolder}
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
