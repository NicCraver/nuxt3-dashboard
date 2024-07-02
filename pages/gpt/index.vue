<template>
  <div>
    <header>
      <UAlert class="mb-4" :title="`${usedMsg} ${surplusMsg}`" />
    </header>
    <UDivider />
    <main>
      <UTable
        :loading="loading"
        :loading-state="{
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...',
        }"
        :progress="{ color: 'primary', animation: 'carousel' }"
        class="w-full"
        :columns="columns"
        :rows="tableData"
      >
        <!-- <template #name-data="{ row }">
          <UInput
            v-model="row.name"
            @input="updatePerson(row.id, 'name', row.name)"
          />
        </template>

        <template #type-data="{ row }">
          <UInput
            v-model="row.type"
            @input="updatePerson(row.id, 'type', row.type)"
          />
        </template> -->

        <template #actions-data="{ row }">
          <UButton @click="open(row)"> 查看 </UButton>
        </template>
        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <span class="italic text-sm">暂无数据!</span>
            <!-- <UButton label="Add people" /> -->
          </div>
        </template>
      </UTable>
    </main>

    <USlideover v-model="isOpen">
      <FormSlideover
        :form-data="formData"
        :close="close"
        :fetch-data="fetchData"
      />
    </USlideover>
  </div>
</template>

<script lang="ts" setup>
import { useGptTable } from "./hooks/useGptTable";
import { useFormSlideover } from "./hooks/useFormSlideover";
import FormSlideover from "./components/FormSlideover.vue";
const {
  loading,
  columns,
  tableData,
  usedMsg,
  surplusMsg,
  fetchData,
  updatePerson,
} = useGptTable();

// 表单抽屉
const { isOpen, close, setFormData, formData,open } = useFormSlideover();
</script>

<style lang="scss" scoped></style>
