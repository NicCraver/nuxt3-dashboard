<script setup lang="ts">
import { z } from "zod";
import { useClipboard } from "@vueuse/core";
import type { FormSubmitEvent } from "#ui/types";
import type { GPTUser } from "~/types";
import dayjs from "dayjs";

const props = defineProps<{
  close: () => void;
  fetchData: () => void;
  formData: GPTUser | null;
}>();

// const { updateUser } = useFetchUser()

const copywriting1 = ref(
  `
  不回答任何疑问哦。由于私信次数有限，每人账号只发一次账号，不够用的和想续费的（返现10%，仅限B站）

  想了解更多内容请加wx：nextdevcc
s
  体验号的人太多了，会影响正式用户的使用。所以现在体验号限制次数，正式用户可以无限提问哦~

  免翻+无限提问+不丢聊天记录+按天充值+对话隔离，全网仅此一家，用过官网版的才知道我的网站有多牛。

  登录地址：https://gpt4.zhiyungpt.com（优先使用谷歌浏览器）

  gpt提示词库 gpts热门推荐‍，网站的详细说明：https://chatdoc.nextdev.cc/guide/guide.html

  用下面的账号密码登录我的网站可体验1天（登录后开始计时，24小时后到期）

  账号----密码
  `
);

const copywriting2 = ref(
  `
  登录地址：https://gpt4.zhiyungpt.com（优先使用谷歌浏览器）

  gpt提示词库 gpts热门推荐‍，网站的详细说明：https://chatdoc.nextdev.cc/guide/guide.html

  账号----密码
  `
);

const { copy } = useClipboard({ source: copywriting1 });
const { copy: copy2 } = useClipboard({ source: copywriting2 });
const toast = useToast();
const schema = z.object({
  name: z.string().min(1, "请填写名称"),
  type: z.string().min(1, "请填写类型"),
  state: z.string().min(1, "请填写状态"),
  id: z.string().min(1, "请填写ID"),
  account: z.string().min(1, "请填写账号"),
  password: z.string().min(1, "请填写密码"),
});

type Schema = z.output<typeof schema>;

const state = ref<GPTUser>({
  id: "",
  name: "",
  account: "",
  password: "",
  type: "",
  state: "",
});

const stateOptions = ref(["已发", "未发"]);
const typeOptions = ref(["微信", "B站"]);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
  // 读取缓存
  const data = JSON.parse(localStorage.getItem('tableData') || '')
  data.filter((el: any) => el.id === event.data.id)[0].name = event.data.name
  data.filter((el: any) => el.id === event.data.id)[0].state = event.data.state
  data.filter((el: any) => el.id === event.data.id)[0].type = event.data.type
  data.filter((el: any) => el.id === event.data.id)[0].updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss')

  localStorage.setItem('tableData', JSON.stringify(data))

    props.close()
    props.fetchData()
    toast.add({ title: '提交成功！' })
  // props.getTableData()
  toast.add({ title: '提交成功！' })
  // props.close();
  // updateUser(event.data).then((res) => {
  //   console.log(`res`, res)
  //   props.close()
  //   props.getTableData()
  //   toast.add({ title: '提交成功！' })
  // }).catch((err) => {
  //   console.log(err)
  // })
}

function onCopy() {
  copy().then(() => {
    toast.add({ title: "复制成功！" });
  });
  // toast.add({ title: 'Hello world!' })
}
function onCopy2() {
  copy2().then(() => {
    toast.add({ title: "复制成功！" });
  });
  // toast.add({ title: 'Hello world!' })
}

onMounted(() => {
  state.value = JSON.parse(JSON.stringify(props.formData));
  state.value.name = "";
  state.value.type = "微信";
  state.value.state = "已发";
  copywriting1.value = `${copywriting1.value}
  ${state.value.account}---${state.value.password}
  `;
  copywriting2.value = `${copywriting2.value}
  ${state.value.account}---${state.value.password}
  `;
});
</script>

<template>
  <UCard class="flex flex-1 flex-col" :ui="{
    body: { base: 'flex-1' },
    ring: '',
    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
  }">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-base text-gray-900 font-semibold leading-6 dark:text-white">
          Slideover
        </h3>
        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="close" />
      </div>
    </template>
    <div class="h-full">
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="ID" name="id">
          <UInput v-model="state.id" disabled />
        </UFormGroup>
        <UFormGroup label="名称" name="name" required>
          <UInput v-model="state.name" autofocus :autofocus-delay="100" />
        </UFormGroup>

        <UFormGroup label="类型" name="type" required>
          <USelectMenu v-model="state.type" :options="typeOptions" />
        </UFormGroup>
        <UFormGroup label="状态" name="state" required>
          <USelectMenu v-model="state.state" :options="stateOptions" />
        </UFormGroup>

        <UFormGroup label="账号" name="account">
          <UInput v-model="state.account" disabled />
        </UFormGroup>
        <UFormGroup label="密码" name="password">
          <UInput v-model="state.password" disabled />
        </UFormGroup>

        <div>
          <UButton @click="onCopy"> 复制B站文案 </UButton>
          <UButton ml-4 @click="onCopy2"> 复制朋友文案 </UButton>
        </div>
        <UButton type="submit"> Submit </UButton>
      </UForm>
    </div>
  </UCard>
</template>

<style scoped></style>
