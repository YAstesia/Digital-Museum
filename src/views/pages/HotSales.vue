<script setup>
import { getCityTopSeries, getProvinceCities, getProvinceTopSeries } from '@/api'; // 导入接口
import { useLayout } from '@/layout/composables/layout';
import * as echarts from 'echarts';
import { onMounted, ref, watch } from 'vue';


const { getPrimary, getSurface, isDarkTheme } = useLayout();
const pieData = ref(null);
const barData = ref(null);
const barData2 = ref(null);
const barData4 = ref(null);
const barData3 = ref(null);
const pieOptions = ref(null);
const barOptions = ref(null);
const barOptions10 = ref(null);
const chartRef = ref(null);
let titleofBar3 = "全国销量前十车系";
let titleofBar2 = "2022年博物馆举办展览数前十省份";
let ProvinceSale = [];
let dropdownValues = ref([]);
let dropdownValue = ref(null);
let dropdownValuePros = ref([]);
let dropdownValuePro = ref(null);
let chartInstance = null;

async function loadInitialData() {
    try {
        titleofBar3 = "近半年全国销量前十车系";
        titleofBar2 = "2022年博物馆举办展览数前十省份";
        //const ProvinceSaleResponse = await getProvinces();
        //ProvinceSale = ProvinceSaleResponse.data.data;
        // 获取前10省份数据

        // // 获取车型销量数据
        // const vehicleResponse = await getVehicleSales();
        // barData4.value = formatPieData(vehicleResponse.data.data);


        // 更新 dropdownValues
        dropdownValues.value = allCities.map(city => ({ name: city, code: city }));
        // 获取所有省份数据
        const provinces = ProvinceSale.map(province => ({
            name: province.province,
            code: province.province
        }));
        // 添加 '全国' 选项到省份列表的前面
        dropdownValuePros.value = [
            { name: '全国', code: '全国' },
            ...provinces
        ];
    } catch (error) {
        console.error("Error loading initial data: ", error);
    }
}

function getGradientColor(value, maxValue) {
    const green = { r: 0, g: 128, b: 0 };
    const orange = { r: 255, g: 165, b: 0 };
    const red = { r: 255, g: 0, b: 0 };
    const ratio = value / maxValue;

    let r, g, b;

    if (ratio >= 0.5) {
        // 从绿色到橙色的渐变
        const adjustedRatio = (ratio - 0.5) / 0.5;
        r = Math.round(orange.r - (orange.r - green.r) * adjustedRatio);
        g = Math.round(orange.g - (orange.g - green.g) * adjustedRatio);
        b = Math.round(orange.b - (orange.b - green.b) * adjustedRatio);
    } else {
        // 从橙色到红色的渐变
        const adjustedRatio = ratio / 0.5;
        r = Math.round(red.r - (red.r - orange.r) * adjustedRatio);
        g = Math.round(red.g - (red.g - orange.g) * adjustedRatio);
        b = Math.round(red.b - (red.b - orange.b) * adjustedRatio);
    }

    // 返回颜色的 rgb 代码
    return `rgb(${r}, ${g}, ${b})`;
}


function setColorOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    barOptions.value = {
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
    pieOptions.value = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        // 获取数据项的标签和数据值
                        const label = context.label || '';
                        const value = context.raw || 0;
                        // 计算总值
                        const total = context.chart.data.datasets[0].data.reduce((acc, curr) => acc + curr, 0);

                        // 计算百分比
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;

                        return `接待游客数: ${value} (${percentage}%)`;
                    }
                }
            }
        }
    };

    barOptions10.value = {
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
            // tooltip: {
            //     callbacks: {
            //         label: function (context) {
            //             console.log(context.raw);
            //             const value = context.raw || 0;
            //             const ranking = context.raw.ranking || 0;
            //             const percentage = context.raw.percentage || 0;

            //             return `销量: ${value} (${percentage}%)\n排名：${ranking}`;
            //         }
            //     }
            // }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

function formatBarData() {
    return {
        labels: ["江苏省", "四川省", "湖南省", "山东省", "河南省", "浙江省", "广东省", "江西省", "北京市", "湖北省",],
        datasets: [
            {
                label: '接待游客数',
                backgroundColor: ["#ffcc66",],
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--p-primary-500'),
                data: [50504625, 47576303, 46765143, 42520503, 36066351, 34455823, 34160730, 32579988, 26228833, 22757576],
                ranking: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        ]
    };
}

function formatBarData2() {
    const topTenDifferences = [
        { province: '山东省', diff: 4032 },
        { province: '广东省', diff: 2749 },
        { province: '浙江省', diff: 2648 },
        { province: '四川省', diff: 2224 },
        { province: '江苏省', diff: 2132 },
        { province: '河南省', diff: 1756 },
        { province: '陕西省', diff: 1337 },
        { province: '江西省', diff: 1337 },
        { province: '安徽省', diff: 1331 },
        { province: '甘肃省', diff: 1276 }
    ];
    return {
        labels: topTenDifferences.map(item => item.province),
        datasets: [
            {
                label: '举办展览数',
                backgroundColor: ["#33ccff"],
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--p-primary-500'),
                data: topTenDifferences.map(item => item.diff),
                ranking: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        ]
    };
}


function formatBarData3(data) {
    return {
        labels: data.map(item => item.series),
        datasets: [
            {
                label: '销量',
                backgroundColor: ["#e95938", "#ff6519", "#f28104", "#ebaf26", "#d4b640", "#b6b34f", "#94a949", "#729a19", "#628f00", "#339a33"],
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--p-primary-500'),
                data: data.map(item => item.totalSale)
            }
        ]
    };
}

function formatPieData() {
    const documentStyle = getComputedStyle(document.documentElement);
    return {
        labels: ['华北地区', '华南地区', '华中地区', '东北地区', '西北地区', '西南地区', '华东地区'],
        datasets: [
            {
                data: [63472160, 50150435, 105589070, 22665918, 47901570, 89421280, 198764270],
                backgroundColor: [documentStyle.getPropertyValue('--p-indigo-500'), documentStyle.getPropertyValue('--p-purple-500'), documentStyle.getPropertyValue('--p-teal-500'), documentStyle.getPropertyValue('--p-red-500'), documentStyle.getPropertyValue('--p-blue-500'), documentStyle.getPropertyValue('--p-yellow-500'), documentStyle.getPropertyValue('--p-orange-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--p-indigo-400'), documentStyle.getPropertyValue('--p-purple-400'), documentStyle.getPropertyValue('--p-teal-400'), documentStyle.getPropertyValue('--p-red-400'), documentStyle.getPropertyValue('--p-blue-400'), documentStyle.getPropertyValue('--p-yellow-400'), documentStyle.getPropertyValue('--p-orange-400')],
            }
        ],
    };
}

async function loadMapData() {
    const response = await fetch('https://geo.datav.aliyun.com/areas/bound/100000_full.json');
    const chinaGeoJson = await response.json();

    echarts.registerMap('china', chinaGeoJson);

    const provinces = [
        '北京市', '天津市', '上海市', '重庆市', '河北省', '山西省', '辽宁省', '吉林省',
        '黑龙江省', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省',
        '河南省', '湖北省', '湖南省', '广东省', '海南省', '四川省', '贵州省',
        '云南省', '陕西省', '甘肃省', '青海省', '台湾省', '广西壮族自治区',
        '内蒙古自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区'
    ];

    const maxValue = 31; // 最大排名值

    // 创建 ProvinceSale 数据，这里假设数据来源与你提供的一致
    const ProvinceSale = [
        { province: '北京市', totalSale: 26228833 },
        { province: '天津市', totalSale: 3515489 },
        { province: '河北省', totalSale: 17344251 },
        { province: '山西省', totalSale: 11103320 },
        { province: '内蒙古自治区', totalSale: 5280267 },
        { province: '辽宁省', totalSale: 9220808 },
        { province: '吉林省', totalSale: 4053041 },
        { province: '黑龙江省', totalSale: 9392069 },
        { province: '上海市', totalSale: 9714554 },
        { province: '江苏省', totalSale: 50504625 },
        { province: '浙江省', totalSale: 34455823 },
        { province: '安徽省', totalSale: 14663422 },
        { province: '福建省', totalSale: 14325355 },
        { province: '江西省', totalSale: 32579988 },
        { province: '山东省', totalSale: 42520503 },
        { province: '河南省', totalSale: 36066351 },
        { province: '湖北省', totalSale: 22757576 },
        { province: '湖南省', totalSale: 46765143 },
        { province: '广东省', totalSale: 34160730 },
        { province: '广西壮族自治区', totalSale: 14233593 },
        { province: '海南省', totalSale: 1756112 },
        { province: '重庆市', totalSale: 17833774 },
        { province: '四川省', totalSale: 47576303 },
        { province: '贵州省', totalSale: 11675917 },
        { province: '云南省', totalSale: 10945408 },
        { province: '西藏自治区', totalSale: 1389878 },
        { province: '陕西省', totalSale: 18906000 },
        { province: '甘肃省', totalSale: 16893105 },
        { province: '青海省', totalSale: 1138269 },
        { province: '宁夏回族自治区', totalSale: 4095761 },
        { province: '新疆维吾尔自治区', totalSale: 6868435 },
    ];

    // 计算排名和百分比
    const totalSales = 577965783;
    let sortedSales = ProvinceSale.slice().sort((a, b) => b.totalSale - a.totalSale);

    sortedSales.forEach((item, index) => {
        item.ranking = index + 1;
        item.percentage = ((item.totalSale / totalSales) * 100).toFixed(2); // 计算百分比
    });

    // 生成 mapData
    const mapData = provinces.map(province => {
        // 查找与 province 匹配的对象
        const saleData = sortedSales.find(item => item.province === province);

        // 如果找到了匹配项，则设置对应的值
        const value = saleData ? saleData.totalSale : 0;
        const ranking = saleData ? saleData.ranking : maxValue;
        const percentage = saleData ? saleData.percentage : 0;

        return {
            name: province,
            value: value,
            ranking: ranking,  // 添加 ranking 属性
            percentage: percentage,  // 添加 percentage 属性
            itemStyle: {
                areaColor: getGradientColor(ranking, maxValue)  // 根据排名设置颜色
            }
        };
    });

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return `
                    ${params.name}<br/>
                    总接待游客数：${params.value}<br/>
                    游客数排名：${params.data.ranking}<br/>
                    游客数占比：${params.data.percentage}%
                `;
            }
        },
        series: [
            {
                name: '中国地图',
                type: 'map',
                map: 'china',
                roam: true,
                label: {
                    show: false,
                    formatter: '{b}',
                },
                itemStyle: {
                    borderColor: '#111',  // 省份边界颜色
                    emphasis: {
                        areaColor: '#FFD700', // 悬停时的颜色
                    },
                },
                data: mapData,
            },
        ],
    };
    chartInstance.setOption(option);
}

async function handleProvinceClick(provinceName) {
    try {
        titleofBar3 = provinceName + "销量前十车系";
        titleofBar2 = provinceName + "城市销量";
        const cityResponse = await getProvinceCities(provinceName);
        // 更新 dropdownValues
        dropdownValues.value = cityResponse.data.data.map(city => ({ name: city.region, code: city.region }));
        barData2.value = formatBarData2(cityResponse.data.data);
        const seriesResponse = await getProvinceTopSeries(provinceName);
        barData3.value = formatBarData3(seriesResponse.data.data);
    } catch (error) {
        console.error("Error loading province cities data: ", error);
    }
}

async function handleCityClick(cityName) {
    try {
        titleofBar4 = cityName + "市销量前十车系"
        const seriesResponse = await getCityTopSeries(cityName);
        barData4.value = formatBarData3(seriesResponse.data.data);
    } catch (error) {
        console.error("Error loading province cities data: ", error);
    }
}

watch(
    [getPrimary, getSurface, isDarkTheme],
    () => {
        setColorOptions();
    },
    { immediate: true }
);
watch(dropdownValue, (newValue) => {
    if (newValue) {
        handleCityClick(newValue.code);

    }
}, { immediate: true });
watch(dropdownValuePro, (newValue) => {
    if (newValue) {
        if (newValue.name === '全国') {
            loadInitialData();
        } else {
            handleProvinceClick(newValue.code);
        }
    }
}, { immediate: true });

onMounted(async () => {
    pieData.value = formatPieData();
    barData.value = formatBarData();
    barData2.value = formatBarData2();
    setColorOptions();
    chartInstance = echarts.init(chartRef.value, { width: '65%', height: '100%' });
    await loadInitialData();
    await loadMapData();
});
</script>

<template>
    <Fluid class="grid grid-cols-12 gap-8">
        <div class="col-span-12 xl:col-span-6">
            <div class="card flex flex-col items-center">
                <div class="font-semibold text-xl mb-4">2022年中国各地区博物馆游客数</div>
                <Chart type="pie" :data="pieData" :options="pieOptions" style="width: 55%; height: 400px;"></Chart>
            </div>
        </div>
        <div class="col-span-12 xl:col-span-6">
            <!-- <Select v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="选择年份" style="margin-bottom: 40px;"/> -->
            <div class="card">
                <div class="font-semibold text-xl mb-4">2022年中国博物馆接待游客数前十省份</div>
                <Chart type="bar" :data="barData" :options="barOptions10" style="width: 100%; height: 400px;"></Chart>
            </div>
        </div>
        <div class="col-span-12 xl:col-span-6">
            <div class="card">
                <!-- <div class="font-semibold text-xl mb-4">中国地图，点击可以切换省份</div> -->
                <div ref="chartRef" style="width: 100%; height: 440px;"></div>
            </div>
        </div>
        <div class="col-span-12 xl:col-span-6">
            <div class="card">
                <div class="font-semibold text-xl mb-4">{{ titleofBar2 }}</div>
                <Chart type="bar" :data="barData2" :options="barOptions" style="width: 100%; height: 400px;"></Chart>
            </div>
        </div>
    </Fluid>
</template>
