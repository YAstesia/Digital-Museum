import { getCustomerData } from '@/api'; // 导入 api.js 中定义的函数

export const CustomerService = {
    async getData() {
        return getCustomerData();
    },

    async getCustomersSmall() {
        const data = await this.getData();
        return data.slice(0, 10);
    },

    async getCustomersMedium() {
        const data = await this.getData();
        return data.slice(0, 50);
    },

    async getCustomersLarge() {
        const data = await this.getData();
        return data.slice(0, 200);
    },

    async getCustomersXLarge() {
        return this.getData();
    },

    getCustomers(params) {
        const queryParams = params
            ? Object.keys(params)
                  .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&')
            : '';

        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
    }
};
