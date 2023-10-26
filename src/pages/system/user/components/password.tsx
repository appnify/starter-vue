import { api } from "@/api";
import { useAniFormModal } from "@/components";

export const usePassworModal = () => {
  return useAniFormModal({
    title: "重置密码",
    trigger: false,
    modalProps: {
      width: 432,
    },
    model: {
      id: undefined,
      nickname: undefined,
    },
    items: [
      {
        field: "password",
        label: ({ model }) => (
          <span>
            <span class="text-brand-500 font-semibold">{model.nickname}</span> 的新密码:
          </span>
        ),
        type: "input",
      },
    ],
    submit: async ({ model }) => {
      return api.user.setUser(model.id, model);
    },
  });
};
