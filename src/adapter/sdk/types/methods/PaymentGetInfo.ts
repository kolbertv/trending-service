export type PaymentGetInfo = {
    code: number;
    data: {
        balance: {
            currency: string;
            amount: number;
        }[];
        paymaster: {
            id: string;
            title: string;
        }[];
        cloudpayments: {
            id: string;
            title: string;
        }[];
        stripe: {
            id: string;
            title: string;
        }[]
    }
}