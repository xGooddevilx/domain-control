import logo from '@/logo.svg'
import { cn } from '@/utils/cn'


type Properties = {
  className?: string
}

export const Logo = ({className}:Properties) => {
  return (
    <img
    src={logo}
    className={cn("size-20 pointer-events-none",className)}
    alt="logo"
  />
  )
}
