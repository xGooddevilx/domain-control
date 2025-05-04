import { Outlet } from "@tanstack/react-router"
import Header from "./components/Header"

import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Rootlayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  )
}
