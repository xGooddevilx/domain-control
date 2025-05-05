import DomainsPage from '@/views/domains-page/DomainsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/domains')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DomainsPage/> 
}
