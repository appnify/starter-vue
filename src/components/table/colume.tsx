import { dayjs } from "@/libs/dayjs";
import { TableColumn } from "./use-interface";

const defineColumn = <T extends TableColumn>(column: T) => {
  return column;
};

export const updateColumn = defineColumn({
  title: "更新用户",
  dataIndex: "createdAt",
  width: 190,
  render({ record }) {
    return (
      <div class="flex flex-col overflow-hidden">
        <span>{record.updatedBy ?? "无"}</span>
        <span class="text-gray-400 text-xs truncate">
          {dayjs(record.updatedAt).format()}
        </span>
      </div>
    );
  },
});

export const createColumn = defineColumn({
  title: "创建用户",
  dataIndex: "createdAt",
  width: 190,
  render({ record }) {
    return (
      <div class="flex flex-col overflow-hidden">
        <span>{record.createdBy ?? "无"}</span>
        <span class="text-gray-400 text-xs truncate">
          {dayjs(record.createdAt).format()}
        </span>
      </div>
    );
  },
});
