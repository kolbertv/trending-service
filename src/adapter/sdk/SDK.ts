import * as axios from 'axios';
import {
    SDKOptions,
    Response,
    PaymentGetInfo
} from './types';

export class SDK {

    private readonly axiosInstance: axios.AxiosInstance;

    private readonly options: SDKOptions;

    constructor(options: SDKOptions) {
        this.options = options;
        this.axiosInstance = axios.default.create({
            baseURL: options.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public async paymentGetInfo(): Promise<Response<PaymentGetInfo>> {
        try {
            const response = await this.axiosInstance.request<PaymentGetInfo>({
                url: '/advertiserapi/payment/getinfo',
                method: 'GET',
                headers: {
                    Cookie: `PHPSESSID=${this.options.token}`
                },
            });

            return {
                status: response.status,
                result: response.data,
            }
        } catch (error) {
            throw this.errorHandler(error);
        }
    }

    private errorHandler(error) {
        if (error.isAxiosError && ['ECONNABORTED', 'ECONNREFUSED', 'ENOTFOUND', 'ECONNRESET'].includes(error.code)) {
            throw ({ status: 500, message: "Server error", axiosError: error.message });
        }

        if (error.response && error.response.status === 401 && error.response.data) {
            throw ({ status: 401, message: 'Wrong token' })
        }
        throw error
    }

}
