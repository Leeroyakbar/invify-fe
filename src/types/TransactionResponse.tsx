export interface TransactionResponse {
    trxId: string
    trxNo: string
    fullName: string
    email: string 
    subscriptionPlan: string
    trxAmount: number
    paymentMethod: string
    paymentStatus: number;
    createdDate: string;
}