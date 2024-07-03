import type { GPTUser } from '~/types'

export function useGptTable() {
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
    const tableData = ref<any>([])

    const usedMsg = computed(() => {
        return `已使用：${tableData.value.filter((p: any) => p.state === '已发').length}`
    })

    const surplusMsg = computed(() => {
        return `剩余：${tableData.value.filter((p: any) => p.state === '未发').length}`
    })

    const toast = useToast()

    const loading = ref(false);

    function updatePerson(id: any, key: any, value: any) {
        const person: any = tableData.value.find((p: GPTUser) => p.id === id)
        if (person)
            person[key] = value
    }

    // 模拟数据
    const fetchData = async () => {
       try {
        loading.value = true;
        const data = await $fetch('/api/gpt-user')
        console.log(`data`, JSON.stringify(data))
        setTimeout(() => {
            tableData.value = data
            toast.add({
                icon: "i-heroicons-check-circle",
                color: "primary",
                title: "查询成功！",
            })
            loading.value = false;
        }, 800);
       } catch (error) {
        console.log(`error`,error)
       }
    }

    onMounted(() => {
        fetchData()
    })

    return {
        loading,
        columns,
        tableData,
        usedMsg,
        surplusMsg,
        fetchData,
        updatePerson
    }
}
