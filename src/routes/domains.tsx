import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/domains')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/domains"!</div>
}
