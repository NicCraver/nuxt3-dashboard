import dayjs from "dayjs";
// 邀请记录数据
import data from "./data.json";
// 本机表格最新数据
import newData from "./new.json";
// const data = [
//   {
//     createTime: "2024-04-11 13:18:23",
//     expireTime: null,
//     lastActiveTime: null,
//     status: 1,
//     userToken: "1oVnqJs",
//   },
//   {
//     createTime: "2024-04-11 13:18:23",
//     expireTime: "2024-08-11 13:24:28",
//     lastActiveTime: "2024-08-10 13:24:28",
//     status: 1,
//     userToken: "NoHiyDk",
//   },
// ];
// const newData = [
//   {
//     id: "clx5ineyp005gnctw8m36btz1",
//     name: "伟鹏.",
//     account: "NoHiyDk",
//     password: "939583",
//     type: "微信",
//     state: "已发",
//     createdAt: "2024-06-08T02:48:39.554Z",
//     updatedAt: "2024-08-10 13:33:05",
//   },
//   {
//     id: "clx5inezt006gnctwtz4yaar1",
//     name: "熊二公主",
//     account: "1oVnqJs",
//     password: "250290",
//     type: "B站",
//     state: "未发",
//     createdAt: "2024-06-08T02:48:39.594Z",
//     updatedAt: "2024-06-08T13:06:06.470Z",
//   },
// ];

// 更新newData的state、name、type
// 根据 lastActiveTime是否为null来判断state，为null则state为未发
// 根据state为未发，name为-则type为-
export const diff = () => {
  const currentDate = dayjs();

  newData.forEach((item: any) => {
    item.createdAt = dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss");
    item.updatedAt = dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm:ss");
    // 使用 dayjs 格式化并解析 updatedAt 日期
    const updatedAtDate = dayjs(item.updatedAt);
    // 使用格式化的日期进行比较
    const diffDays = currentDate.diff(updatedAtDate, "day");

    // 如果 updatedAt 在最近 10 天内, 则跳过此条目的状态更新
    if (diffDays <= 10) {
      return; // 跳到下一个迭代
    }

    // 查找对应的 userToken 数据
    const userData = data.find((user) => user.userToken === item.account);
    if (userData && userData.lastActiveTime === null) {
      item.state = "未发";
      item.name = "-";
      item.type = "-";
    } else {
      item.state = "已发";
      // 如果 state 是 已发, 保持原有的 name 和 type
      // 这部分逻辑根据需求可能需要调整
    }
  });

  // 然后按特定规则进行排序
  newData.sort((a, b) => {
    // 检查是否有 name 或 name 为 '-'
    const nameA = !a.name || a.name === "-";
    const nameB = !b.name || b.name === "-";

    if (nameA && !nameB) {
      return -1; // a 没有 name，a 排在 b 前面
    } else if (!nameA && nameB) {
      return 1; // b 没有 name，b 排在 a 前面
    } else {
      // 使用 dayjs 解析并格式化日期进行比较
      const dateA = dayjs(a.updatedAt);
      const dateB = dayjs(b.updatedAt);
      return dateA.isAfter(dateB) ? 1 : -1; // 日期更早的排前面，更晚的排后面
    }
  });
  // 可选，可以返回更新和排序后的 newData
  return newData;
};
