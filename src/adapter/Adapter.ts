import { SDK } from './sdk'

export class Adapter {

    private sdk: SDK;

    constructor(params: { baseUrl: string, token: string }) {
        const { baseUrl, token } = params;
        this.sdk = new SDK({
            baseUrl,
            token
        })
    }

    public async getBalance() {

        const result = await this.sdk.paymentGetInfo();

        const balance = result?.result?.data.balance;

        return balance;
    }
}