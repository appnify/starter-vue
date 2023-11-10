import { useModel } from "./useModel";
import { useItems } from "./useItems";
import { UseOptions } from "./interface";
import { UseForm } from "./types/Form";

/**
 * 构建表单组件的参数
 */
export const useForm = <T extends UseForm>(options: T) => {
  const initModel = options.model ?? {};
  const { items, updateItemOptions } = useItems(options.items ?? [], initModel, Boolean(options.submit));
  const { model, resetModel, setModel, getModel } = useModel(initModel);

  return {
    model,
    items,
    resetModel,
    setModel,
    getModel,
    updateItemOptions,
  };
};
