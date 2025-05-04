import { createRootRoute } from '@tanstack/react-router'

import { Rootlayout } from '@/layout/RootLayout/Rootlayout'

export const Route = createRootRoute({
  component: () => <Rootlayout />,
})

// So this is our root layout. 
