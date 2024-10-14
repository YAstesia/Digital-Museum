export const DashboardService = {
    getProductsData() {
        return [
            {
                rank: 1,
                series: '故宫博物院',
                type: '1917657',
                sales: 1933
            },
            {
                rank: 2,
                series: '秦始皇帝陵博物馆',
                type: '7585',
                sales: 1122
            },
            {
                rank: 3,
                series: '中国国家博物馆',
                type: '1431493',
                sales: 676
            },
            {
                rank: 4,
                series: '南京博物院',
                type: '433265',
                sales: 507
            },
            {
                rank: 5,
                series: '苏州博物馆',
                type: '34011',
                sales: 485
            },
            {
                rank: 6,
                series: '武侯祠博物馆',
                type: '23191',
                sales: 453
            },
            {
                rank: 7,
                series: '沈阳故宫博物院',
                type: '109191',
                sales: 441
            },
            {
                rank: 8,
                series: '湖南博物院',
                type: '527559',
                sales: 440
            },
            {
                rank: 9,
                series: '湖北省博物馆',
                type: '242757',
                sales: 436
            },
            {
                rank: 10,
                series: '中国大运河博物馆',
                type: '6503',
                sales: 421
            },
        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};
