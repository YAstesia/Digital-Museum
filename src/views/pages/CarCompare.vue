<script setup>//!!!
import { useLayout } from '@/layout/composables/layout';
// import { CountryService } from '@/service/CountryService';
import { getCarEvl, getCarSales, getCarSeries, getCarTirm } from '@/api';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const { getPrimary, getSurface, isDarkTheme } = useLayout();
const lineData = ref(null);
const polarData = ref(null);
const polarData1 = ref(null);
const searchQuery = ref('');
const searchQuery2 = ref('');
const searchQuery3 = ref('');
const barData = ref({
    labels: ["年接待游客数", "馆藏珍贵文物数", "馆藏文物数"],
    datasets: []
});
var tirmDetail = new Array();
// const tirmDetail = ref([]);
let TirmNames = ref([]);
let YearlySales = [];
let TirmSales = [];
const tirm1 = ref('');
const tirm2 = ref('');
const tirm3 = ref('');
const tirm4 = ref('');
const tirm5 = ref('');

onMounted(() => {
    tirm1.value = localStorage.getItem('trim1');
    tirm2.value = localStorage.getItem('trim2');
    tirm3.value = localStorage.getItem('trim3');
    tirm4.value = localStorage.getItem('trim4');
    tirm5.value = localStorage.getItem('trim5');

    setColorOptions();
    // fetchAllCarTirms();
    // 从 localStorage 中获取存储的车型名称
    const tirmKeys = ['trim1', 'trim2', 'trim3', 'trim4', 'trim5'];
    tirmKeys.forEach(key => {
        const tirmName = localStorage.getItem(key);
        if (tirmName && tirmName.trim() !== '') {
            TirmNames.value.push(tirmName);
        }
    });

    showAllChartData();
    // console.log(TirmNames.value);

});


async function showAllChartData() {
    // 创建一个包含所有 fetchCarTirmDetail 调用的 Promise 数组
    // console.log(TirmNames.value);
    const promises = TirmNames.value.map(tirm => fetchCarTirmDetail(tirm));

    // 使用 Promise.all 等待所有请求完成
    await Promise.all(promises);
    // console.log(tirmDetail);
    updatePolarData(tirmDetail);
    updatePolarData1(YearlySales);
    updateLineData(TirmSales);
    updateBarData();
}

async function search1() {
    try {
        const response = await fetch('http://localhost:8081/museum/museum/mname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mname: searchQuery.value })
        });

        const result = await response.json();
        if (result.success) {
            updateBarData(result.data, 0);  // 传入数据和数据集索引
        } else {
            console.error(result.msg);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// search2 函数
async function search2() {
    try {
        const response = await fetch('http://localhost:8081/museum/museum/mname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mname: searchQuery2.value })
        });

        const result = await response.json();
        if (result.success) {
            updateBarData(result.data, 1);  // 传入数据和数据集索引
        } else {
            console.error(result.msg);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function search3() {
    try {
        const response = await fetch('http://localhost:8081/museum/museum/mname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mname: searchQuery3.value })
        });

        const result = await response.json();
        if (result.success) {
            updateBarData(result.data, 2);  // 传入数据和数据集索引
        } else {
            console.error(result.msg);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


// clear 函数
function clear() {
    searchQuery.value = '';
    searchQuery2.value = '';
    searchQuery3.value = '';
    barData.value = {
        labels: ["年接待游客数", "馆藏珍贵文物数", "馆藏文物数"],
        datasets: []
    };
}

function updateBarData(data, datasetIndex) {
    if (!data || !data.mname) {
        console.error('Invalid data:', data);
        return;
    }

    const colors = ['#3f51b5', '#e91e63', '#4caf50', '#ff9800'];

    const newDataset = {
        label: data.mname,
        data: [data.mvisitors, data.mpreciousItems, data.mtotalItems],
        backgroundColor: colors[datasetIndex],
        borderColor: colors[datasetIndex],
        borderWidth: 1,
        //yAxisID: 'y-axis-default'
    };

    // 直接替换 datasets，避免过多处理
    barData.value.datasets[datasetIndex] = newDataset;

    // 强制 Vue 重新渲染图表
    nextTick(() => {
        barData.value = { ...barData.value };
        chartInstance.update();
    });
}

// function updateLineData() {
//     lineData = formatLineData();
// }
function updateLineData(data) {
    const documentStyle = getComputedStyle(document.documentElement);
    const colors = [documentStyle.getPropertyValue('--p-indigo-500'), documentStyle.getPropertyValue('--p-purple-500'), documentStyle.getPropertyValue('--p-teal-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-red-500')];
    lineData.value = {
        labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
        datasets: []
    }
    for (let i = 0; i < tirmDetail.length; ++i) {
        const color = colors[i];
        if (tirmDetail[i].tirmSales != null) {
            const dataset = {
                label: tirmDetail[i].tirm,
                data: tirmDetail[i].tirmSales.map(item => item.totalSale),
                fill: false,
                backgroundColor: color,
                borderColor: color,
                tension: 0.4
            }
            lineData.value.datasets.push(dataset);
        }
    }
}
const fetchCarTirmDetail = async (tirm) => {
    try {
        const response = await getCarTirm(tirm);
        if (response.data.success) {
            let tirmInfo = response.data.data;
            // 将车型详细信息添加到 tirmDetail 数组中
            // tirmDetail.push(response.data.data);
            // console.log(tirmDetail);
            const id = response.data.data.id; // cartirm的id
            // 获取 CarSeries 信息
            const responseSeries = await getCarSeries(response.data.data.series);
            if (responseSeries.data.success) {
                const seriesDetail = responseSeries.data.data;
                const seriesId = seriesDetail.id;
                const responseCarSales = await getCarSales(seriesId, 2024)
                let sales = [];
                let YearlySale = 0;
                if (responseCarSales.data.success) {
                    sales = responseCarSales.data.data;
                    sales.forEach(sale => {
                        YearlySale += sale.totalSale;
                    });
                    tirmInfo.yearSale = YearlySale;
                    tirmInfo.tirmSales = sales;
                } else {
                    console.error('查询失败:', responseSeries.data.msg);
                }
                const responseEvl = await getCarEvl(seriesId);
                if (responseEvl.data.success) {
                    const evalData = responseEvl.data.data;
                    let detail = [];
                    // console.log(evalData);
                    // 使用从后端获取的数据替换 detail 数组的数值
                    if (evalData != null) {
                        detail = [
                            evalData.overallRating,
                            evalData.space,
                            evalData.driveFeel,
                            evalData.powerConsum,
                            evalData.outDecor,
                            evalData.inDecor,
                            evalData.qpRatio,
                            evalData.configure
                        ]
                    }
                    tirmInfo.evls = detail;
                } else {
                    console.error('查询失败:', response.data.msg)
                }
                // console.log(tirmDetail);
                tirmDetail.push(tirmInfo);
            } else {
                console.error('查询失败:', response.data.msg);
            }
        }
    } catch (error) {
        console.error('获取数据失败:', error);
    }
};
function updatePolarData(detail) {
    polarData.value = formatPolarData(detail);
}
function formatPolarData(data) {
    // const sortedData = data.sort((a, b) => b.price - a.price);
    const documentStyle = getComputedStyle(document.documentElement);
    return {
        labels: data.map(item => item.tirm),
        datasets: [
            {
                data: data.map(item => item.price),
                backgroundColor: [documentStyle.getPropertyValue('--p-indigo-500'), documentStyle.getPropertyValue('--p-purple-500'), documentStyle.getPropertyValue('--p-teal-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-red-500')],
                // label: '车型价格'
            }
        ]
    };
}
function updatePolarData1(yearlySale) {
    polarData1.value = formatPolarData1(yearlySale);
}
function formatPolarData1(data) {
    // const sortedData = data.sort((a, b) => b.price - a.price);
    // console.log(data);
    const documentStyle = getComputedStyle(document.documentElement);
    return {
        labels: tirmDetail.map(item => item.tirm),
        datasets: [
            {
                data: tirmDetail.map(item => item.yearSale),
                backgroundColor: [documentStyle.getPropertyValue('--p-indigo-500'), documentStyle.getPropertyValue('--p-purple-500'), documentStyle.getPropertyValue('--p-teal-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-red-500')],
                // label: '车型价格'
            }
        ]
    };
}

function setColorOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
}

watch(
    [getPrimary, getSurface, isDarkTheme],
    () => {
        setColorOptions();
    },
    { immediate: true }
);

const router = useRouter();

</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl" style="margin-bottom: 30px;">博物馆比较
            <Button label="清空比较" @click="clear" style="margin-left: 20px;" />
        </div>

        <div class="flex">
            <InputGroup class="mb-4" style="width: 300px; margin-right: 50px;">
                <InputText v-model="searchQuery" placeholder="输入需要对比的第一个博物馆" />
                <Button label="加入比较" @click="search1" />
            </InputGroup>
            <InputGroup class="mb-4" style="width: 300px; margin-right: 50px;">
                <InputText v-model="searchQuery2" placeholder="输入需要对比的第二个博物馆" />
                <Button label="加入比较" @click="search2" />
            </InputGroup>
            <InputGroup class="mb-4" style="width: 300px; margin-right: 50px;">
                <InputText v-model="searchQuery3" placeholder="输入需要对比的第三个博物馆" />
                <Button label="加入比较" @click="search3" />
            </InputGroup>
        </div>
    </div>
    <div class="grid grid-cols-12 gap-8 mt-8" style="margin-left: 200px; width: 1600px;">
        <div class=" col-span-12 xl:col-span-6">
            <div class="card flex flex-col justify-center items-center" style="height: 500px;">
                <div class="font-semibold text-xl mb-4">指标比较</div>
                <Chart type="bar" :data="barData" :options="barOptions"
                    style="height: 100%; width: 100%; padding: 0;margin-top: 50px;"></Chart>
            </div>
        </div>
    </div>
</template>
