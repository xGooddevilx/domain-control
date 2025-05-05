export type DomainStatus = 'pending' | 'verified' | 'rejected'

export type Domain = {
    id: string
    domain: string
    status: DomainStatus
    isActive: boolean
    createdAt: number
}