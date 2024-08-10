import type { GPTUser } from "~/types";
import dayjs from "dayjs";
import { diff } from "./diff";

export function useGptTable() {
  const columns = [
    {
      key: "account",
      label: "账号",
    },
    {
      key: "password",
      label: "密码",
    },
    {
      key: "updatedAt",
      label: "更新时间",
    },
    {
      key: "state",
      label: "状态",
    },
    {
      key: "type",
      label: "类型",
    },
    {
      key: "name",
      label: "姓名",
    },
    {
      key: "actions",
    },
  ];
  const tableData = ref<any>([]);

  const usedMsg = computed(() => {
    return `已使用：${
      tableData.value.filter((p: any) => p.state === "已发").length
    }`;
  });

  const surplusMsg = computed(() => {
    return `剩余：${
      tableData.value.filter((p: any) => p.state === "未发").length
    }`;
  });

  const toast = useToast();

  const loading = ref(false);

  function updatePerson(id: any, key: any, value: any) {
    const person: any = tableData.value.find((p: GPTUser) => p.id === id);
    if (person) person[key] = value;
  }

  // 模拟数据
  const fetchData = async () => {
    console.log(`diff()`,diff())
    // loading.value = true;
    const flag = true; // true 为缓存 false 为刷新
    if (flag) {
      tableData.value = JSON.parse(localStorage.getItem("tableData") || "");
    } else {
      const data: any = diff();
      localStorage.setItem("tableData", JSON.stringify(data));
    }
  };

  onMounted(() => {
    fetchData();
  });

  return {
    loading,
    columns,
    tableData,
    usedMsg,
    surplusMsg,
    fetchData,
    updatePerson,
  };
}
