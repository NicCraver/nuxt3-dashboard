<script setup lang="ts">
import { useFormSlideover } from './hooks/useFormSlideover'
import FormSlideover from './components/FormSlideover.vue'
import type { GPTUser } from '~/types/api'

// 表单抽屉
const { isOpen, close, setFormData, formData } = useFormSlideover()

// const {
//   getAllUsers,
//   //  getUserById, createUser, updateUser, deleteUser
// } = useFetchUser()

const columns = [
  {
    key: 'account',
    label: '账号',
  },
  {
    key: 'password',
    label: '密码',
  },
  {
    key: 'updatedAt',
    label: '更新时间',
  },
  {
    key: 'state',
    label: '状态',
  },
  {
    key: 'type',
    label: '类型',
  },
  {
    key: 'name',
    label: '姓名',
  },
  {
    key: 'actions',
  },
]

const people = ref<any>([])

function test(row: any) {
  isOpen.value = true
  setFormData(row)
}

function updatePerson(id: any, key: any, value: any) {
  const person: any = people.value.find((p: GPTUser) => p.id === id)
  if (person)
    person[key] = value
}
async function getTableData() {
  // getAllUsers()
  //   .then((res: any) => {
  //     // console.log(`res`, JSON.stringify(res))
  //     people.value = res

  //     useToast().add({ title: '查询成功！' })
  //   })
  try {
    const { data } = await useFetch('/api/gpt-user')
    people.value = data.value
  }
  catch (error) {
    console.log(`error`, error)
  }
}

// watchEffect(() => {
//   console.log(`data`, data.value,
//   )
// })
onMounted(async () => {
  // console.log(`data.value`, data.value)
  // people.value = data.value
  getTableData()
})

const usedMsg = computed(() => {
  // people.value.filter((p: any) => p.state === 'used').length
  return `已使用：${people.value.filter((p: any) => p.state === '已发').length}`
})

const surplusMsg = computed(() => {
  // people.value.filter((p: any) => p.state === 'surplus').length
  return `剩余：${people.value.filter((p: any) => p.state === '未发').length}`
})
</script>

<template>
  <div>
    <UAlert class="mb-4" :title="`${usedMsg} ${surplusMsg}`" />
    <UDivider />
    <UTable :rows="people" :columns="columns">
      <template #name-data="{ row }">
        <UInput v-model="row.name" @input="updatePerson(row.id, 'name', row.name)" />
      </template>

      <template #type-data="{ row }">
        <UInput v-model="row.type" @input="updatePerson(row.id, 'type', row.type)" />
      </template>

      <template #actions-data="{ row }">
        <UButton @click="test(row)">
          复制
        </UButton>
      </template>
    </UTable>

    <USlideover v-model="isOpen">
      <FormSlideover :form-data="formData" :close="close" :get-table-data="getTableData" />
    </USlideover>
  </div>
</template>

<style scoped></style>
