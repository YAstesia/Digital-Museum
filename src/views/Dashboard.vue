<script setup>
import { useLayout } from '@/layout/composables/layout';
import { DashboardService } from '@/service/DashboardService';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const { getPrimary, getSurface, isDarkTheme } = useLayout();

const products = ref(null);
const chartData = ref(null);
const chartOptions = ref(null);
const router = useRouter();

const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-trash' }
]);

onMounted(() => {
    DashboardService.getProductsSmall().then((data) => (products.value = data));
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

function setChartData() {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['2018年', '2019年', '2020年', '2021年', '2022年', '2023年',],
        datasets: [
            {
                type: 'bar',
                label: '总接待游客数（亿人次）',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                data: [10.08, 12.27, 5.4, 7.79, 5.78, 12.90],
                barThickness: 32
            },
        ]
    };
}

function setChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const borderColor = documentStyle.getPropertyValue('--surface-border');
    const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textMutedColor
                },
                grid: {
                    color: 'transparent',
                    borderColor: 'transparent'
                }
            },
            y: {
                stacked: true,
                ticks: {

                    color: textMutedColor
                },
                grid: {
                    color: borderColor,
                    borderColor: 'transparent',
                    drawTicks: false
                }
            }
        }
    };
}

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const goDetail = () => {
    router.push('/cardetail');
};

watch([getPrimary, getSurface, isDarkTheme], () => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 xl:col-span-6">
            <div class="card">
                <div class="font-semibold text-xl mb-4">2023年最受欢迎博物馆</div>
                <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
                    <Column field="rank" header="排名" :sortable="false" style="width: 10%">
                        <template #body="slotProps">
                            <span class="font-bold" style="font-size: 14pt;">{{ slotProps.data.rank }}</span>
                        </template>
                    </Column>
                    <Column field="series" header="名称" :sortable="false" style="width: 30%">
                        <template #body="slotProps">
                            <span class="font-semibold" style="font-size: 12pt;">{{ slotProps.data.series }}</span>
                        </template>
                    </Column>
                    <Column field="sales" header="馆藏量（件）" :sortable="false" style="width: 30%">
                        <template #body="slotProps">
                            <span class="font-bold" style="font-size: 14pt; color: red;">{{ slotProps.data.type
                                }}</span>
                        </template>
                    </Column>
                    <Column field="sales" header="接待游客数" :sortable="false" style="width: 30%">
                        <template #body="slotProps">
                            <span class="font-bold" style="font-size: 14pt; color: crimson;">{{ slotProps.data.sales
                                }} 万人</span>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="card">
                <div class="flex justify-between items-center mb-6">
                    <div class="font-semibold text-xl w-1/3">省份</div>
                    <div class="font-semibold text-xl w-1/3" style="margin-right: -60px">博物馆数</div>
                    <div class="font-semibold text-xl w=1/3">接待游客数（万人次）</div>
                </div>
                <ul class="list-none p-0 m-0">
                    <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div class="w-1/3">
                            <span class="text-surface-900 dark:text-surface-0 mr-2 mb-1 md:mb-0 font-bold"
                                style="font-size: 14pt;">山东省</span>
                            <div class="mt-1 text-muted-color">博物馆数量No.1</div>
                        </div>
                        <div class="mt-2 md:mt-0 flex justify-center items-center h-full w-1/3">
                            <span class="text-red-500 ml-4 font-bold" style="font-size: 20pt;">711</span>
                        </div>
                        <div class="mt-2 md:mt-0 flex justify-center items-center w-1/3">
                            <span class="text-red-500 ml-4 font-bold" style="font-size: 20pt;">8750</span>
                        </div>
                    </li>
                    <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div class="w-1/3">
                            <span class="text-surface-900 dark:text-surface-0 font-bold mr-2 mb-1 md:mb-0"
                                style="font-size: 14pt;">浙江省</span>
                            <div class="mt-1 text-muted-color">博物馆数量No.2</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0   flex justify-center items-center h-full w-1/3">
                            <span class="text-red-400 ml-4 font-bold " style="font-size: 20pt;">435</span>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0  justify-center flex items-center w-1/3">
                            <span class="text-red-400 ml-4 font-bold" style="font-size: 20pt;">暂无数据</span>
                        </div>
                    </li>
                    <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div class="w-1/3">
                            <span class="text-surface-900 dark:text-surface-0 font-bold mr-2 mb-1 md:mb-0"
                                style="font-size: 14pt;">四川省</span>
                            <div class="mt-1 text-muted-color">博物馆数量No.3</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0   flex justify-center items-center h-full w-1/3">
                            <span class="text-orange-400 ml-4 font-bold" style="font-size: 20pt;">406</span>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 w-1/3 justify-center flex items-center">
                            <span class="text-orange-400 ml-4 font-bold" style="font-size: 20pt;">8540</span>
                        </div>
                    </li>
                    <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div class="w-1/3">
                            <span class="text-surface-900 dark:text-surface-0 font-bold mr-2 mb-1 md:mb-0"
                                style="font-size: 14pt;">河南省</span>
                            <div class="mt-1 text-muted-color">博物馆数量No.4</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0   flex justify-center items-center h-full w-1/3">
                            <span class="text-yellow-500 ml-4 font-bold" style="font-size: 20pt;">395</span>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 w-1/3 justify-center flex items-center">
                            <span class="text-yellow-500 ml-4 font-bold" style="font-size: 20pt;">8000</span>
                        </div>
                    </li>
                    <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div class="w-1/3">
                            <span class="text-surface-900 dark:text-surface-0 font-bold mr-2 mb-1 md:mb-0"
                                style="font-size: 14pt;">广东省</span>
                            <div class="mt-1 text-muted-color">博物馆数量No.5</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 flex justify-center items-center h-full w-1/3">
                            <span class="text-green-500 ml-4 font-bold" style="font-size: 20pt;">377</span>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 flex justify-center items-center w-1/3">
                            <span class="text-green-500 ml-4 font-bold" style="font-size: 20pt;">7955</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-span-12 xl:col-span-6">
            <div class="card">
                <div class="font-semibold text-xl mb-4">全国博物馆年度接待游客数</div>
                <Chart type="bar" :data="chartData" :options="chartOptions" class="h-80" />
            </div>
            <div class="card">
                <div class="flex items-center justify-between mb-6">
                    <div class="font-semibold text-xl">数据概览</div>
                </div>

                <ul class="p-0 m-0 list-none mb-6">
                    <li class="flex items-center py-2 border-b border-surface">
                        <div
                            class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                            <i class="pi pi-dollar !text-xl text-blue-500"></i>
                        </div>
                        <span class="text-surface-900 dark:text-surface-0 leading-normal">
                            <span class="text-surface-700 dark:text-surface-100 font-bold">2023年全国博物馆数量 <span
                                    class="text-primary font-bold"
                                    style="font-size: 22pt; margin-left: 5px; margin-right: 5px;">6833</span>座</span>
                        </span>
                    </li>
                </ul>

                <ul class="p-0 m-0 list-none mb-6">
                    <li class="flex items-center py-2 border-b border-surface">
                        <div
                            class="w-12 h-12 flex items-center justify-center bg-pink-100 dark:bg-pink-400/10 rounded-full mr-4 shrink-0">
                            <i class="pi pi-dollar !text-xl text-pink-500"></i>
                        </div>
                        <span class="text-surface-900 dark:text-surface-0 leading-normal">
                            <span class="text-surface-700 dark:text-surface-100 font-bold">2023年国有博物馆藏品总数<span
                                    class="text-primary font-bold"
                                    style="font-size: 22pt; margin-left: 5px; margin-right: 5px;">3363.3</span>万件</span>
                        </span>
                    </li>
                </ul>

                <ul class="p-0 m-0 list-none mb-6">
                    <li class="flex items-center py-2 border-b border-surface">
                        <div
                            class="w-12 h-12 flex items-center justify-center bg-red-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                            <i class="pi pi-dollar !text-xl text-red-500"></i>
                        </div>
                        <span class="text-surface-900 dark:text-surface-0 leading-normal">
                            <span class="text-surface-700 dark:text-surface-100 font-bold">2023年博物馆总接待游客数<span
                                    class="text-primary font-bold"
                                    style="font-size: 22pt; margin-left: 5px; margin-right: 5px;">102129</span>万人次</span>
                        </span>
                    </li>
                </ul>


                <ul class="p-0 m-0 list-none mb-4">
                    <li class=" flex items-center py-2 border-b border-surface">
                        <div
                            class="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                            <i class="pi pi-dollar !text-xl text-green-500"></i>
                        </div>
                        <span class="text-surface-900 dark:text-surface-0 leading-normal">
                            <span class="text-surface-700 dark:text-surface-100 font-bold">2023年总接待游客数同比增长 <span
                                    class="text-primary font-bold"
                                    style="font-size: 22pt; margin-left: 5px; margin-right: 5px;">123.7</span>%</span>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="card" style="margin-top: -20px;">
                <li class="flex items-center border-b border-surface">
                    <div
                        class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                        <i class="pi pi-car !text-xl text-blue-500"></i>
                    </div>
                    <span class="text-surface-900 dark:text-surface-0 leading-normal">
                        <span class="text-surface-700 dark:text-surface-100 font-bold">本网站共统计博物馆相关数据 <span
                                class="text-primary font-bold"
                                style="font-size: 22pt; margin-left: 5px; margin-right: 5px; color: crimson;">59085</span>条</span>
                    </span>
                </li>
            </div>
        </div>
    </div>
</template>
