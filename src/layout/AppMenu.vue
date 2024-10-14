<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: '数智博物',
        items: [
            {
                label: '功能导航', icon: 'pi pi-fw pi-bars',
                items: [
                    {
                        label: '首页',
                        icon: 'pi pi-fw pi-home',
                        to: '/dashboard'
                    },
                    {
                        label: '数据查询',
                        icon: 'pi pi-fw pi-search',
                        items: [
                            { label: '博物馆数据查询', icon: 'pi pi-fw pi-search-plus', to: '/carsearch' },
                        ]
                    },
                    {
                        label: '博物馆大数据分析',
                        icon: 'pi pi-fw pi-globe',
                        items: [
                            { label: '博物馆数据分析', icon: 'pi pi-fw pi-chart-bar', to: '/salestrend' },
                            { label: '博物馆藏品分析', icon: 'pi pi-fw pi-chart-bar', to: '/salesanalysis' },
                            { label: '博物馆参观排行榜', icon: 'pi pi-fw pi-chart-bar', to: '/hotsales' },
                            { label: '数字博物馆分析', icon: 'pi pi-fw pi-chart-bar', to: '/purpose' },
                        ]
                    },
                    {
                        label: '工具',
                        icon: 'pi pi-fw pi-wrench',
                        items: [
                            { label: '博物馆比较', icon: 'pi pi-fw pi-comments', to: '/carcompare' }
                        ]
                    },
                ]
            },
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
