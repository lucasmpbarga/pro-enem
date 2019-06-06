export interface ISubscription {
    id: number,
    updated: Date,
    created: Date,
    status: number,
    endDate: Date,
    startDate: Date,
    autoRenew: number,
    amount: string,
    installments: number,
    description: string,
}
