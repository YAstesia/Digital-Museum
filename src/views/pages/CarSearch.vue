<template>
  <div class="card">
    <div class="font-semibold text-xl mb-4">博物馆查询</div>
    <div class="flex justify-between">
      <!-- 关键词搜索 -->
      <div class="flex flex-col md:flex-row gap-4">
        <InputGroup class="mb-4">
          <Button label="搜索" @click="search" />
          <InputText v-model="searchQuery" placeholder="在此处进行搜索" />
          <div v-if="isLoading" class="mt-4" style="margin-left: 20px;">正在筛选，请等待……</div>
        </InputGroup>
      </div>
      <!-- 清空过滤器 -->
      <Button type="button" icon="pi pi-filter-slash" label="清空" outlined @click="ClearFilter" />
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            <div class="font-semibold text-xl">名称</div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="font-semibold text-xl">省份</div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="font-semibold text-xl">年接待游客数</div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="font-semibold text-xl">馆藏珍贵文物数</div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="font-semibold text-xl">藏品数</div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="font-semibold text-xl">年举办展览数</div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="font-semibold text-xl">博物馆类型</div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="font-semibold text-xl">博物馆等级</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in displayedData" :key="item.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="px-6 py-4" style="width: 25%;"><span class="font-bold" style="font-size: 16px; ">{{ item.mname
              }}</span></td>
          <td class="px-6 py-4" style="width: 10%;"><span class="font-bold" style="font-size: 16px;">{{ item.province
              }}</span></td>
          <td class="px-6 py-4" style="width: 10%;"><span class="font-bold" style="font-size: 16px; ">{{
            item.mvisitors }}</span></td>
          <td class="px-6 py-4" style="width: 10%;"><span class="font-bold" style="font-size: 16px;">{{
            item.mpreciousItems }}</span></td>
          <td class="px-6 py-4" style="width: 10%;"><span class="font-bold" style="font-size: 16px; ">{{
            item.mtotalItems }}</span></td>
          <td class="px-6 py-4" style="width: 10%;"><span class="font-bold" style="font-size: 16px; ">{{
            item.mexhibitions }}</span></td>
          <td class="px-6 py-4" style="width: 10%;">
            <Tag :options="statuses" :value="item.mqualityLevel" :severity="getSeverity(item.mqualityLevel)"
              style="font-size: 14px;"></Tag>
          </td>
          <td class="px-6 py-4" style="width: 15%;"><span class="font-bold" style="font-size: 16px;">{{ item.mtype
              }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!hasData" class="mt-4">找不到符合条件的数据。</div>
    <custom-pagination :currentPage="currentPage" :totalPages="pages" @page-change="handlePageChange" />
  </div>
</template>

<script setup>
import { SearchCarTirm } from "@/api";
import CustomPagination from '@/views/uikit/CustomePaginator.vue';
import { onMounted, ref } from 'vue';

// 定义变量
const searchQuery = ref(localStorage.getItem('searchQuery') || '');
const currentPage = ref(parseInt(localStorage.getItem('currentPage')) || 1);
const pageSize = ref(10);
const pages = ref(0);
const totalRecords = ref(0);
const displayedData = ref([]);
const isLoading = ref(false);
const hasData = ref(true);

// 状态严重性映射
const statuses = ["未定级",
  "一级",
  "二级",
  "三级"];

// 获取严重性
function getSeverity(status) {
  switch (status) {
    case '一级':
      return 'danger';
    case '三级':
      return 'success';
    case '未定级':
      return 'info';
    case '二级':
      return 'warn';
  }
}

// 搜索函数
const search = async () => {
  try {
    currentPage.value = 1;
    isLoading.value = true;
    localStorage.setItem('searchQuery', searchQuery.value);
    localStorage.setItem('currentPage', currentPage.value);
    const response = await SearchCarTirm(currentPage.value, pageSize.value, searchQuery.value);
    displayedData.value = response.data.data.records || [];
    totalRecords.value = response.data.data.total || 0;
    pages.value = Math.ceil(totalRecords.value / pageSize.value);
    hasData.value = displayedData.value.length > 0;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
};

// 搜索函数
const searchPage = async () => {
  try {
    isLoading.value = true;
    localStorage.setItem('searchQuery', searchQuery.value);
    localStorage.setItem('currentPage', currentPage.value);
    const response = await SearchCarTirm(currentPage.value, pageSize.value, searchQuery.value);
    displayedData.value = response.data.data.records || [];
    totalRecords.value = response.data.data.total || 0;
    pages.value = Math.ceil(totalRecords.value / pageSize.value);
    hasData.value = displayedData.value.length > 0;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
};
function ClearFilter() {
  searchQuery.value = '';
  localStorage.removeItem('searchQuery');
  currentPage.value = 1;
  search();
}
// 分页改变时触发搜索
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  searchPage();
};

// 初始化加载数据
onMounted(() => {
  searchPage();
});
</script>
