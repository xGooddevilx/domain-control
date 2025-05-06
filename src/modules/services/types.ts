import type { Identifiers } from "./Identifiers"

export type DomainStatus = 'pending' | 'verified' | 'rejected'

export type DomainDto = {
    id: Identifiers.DomainId
    domain: string
    status: DomainStatus
    isActive: boolean
    createdAt: number
}



export type DomainVariables = {
  domain: string
  status: DomainStatus
  isActive: boolean
  createdAt: number
}