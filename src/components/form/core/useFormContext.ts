import { InjectionKey } from "vue";
import { FormItems } from "./useFormItems";
import { FormModel } from "./useFormModel";
import { FormRef } from "./useFormRef";
import { FormSubmit } from "./useFormSubmit";

export type FormContextInterface = FormModel &
  FormItems &
  FormRef &
  FormSubmit & {
    slots: Recordable;
  };

export const FormContextKey = Symbol("FormContextKey") as InjectionKey<FormContextInterface>;

export function useFormContext() {
  const context = inject(FormContextKey);
  if (!context) {
    throw Error("useFormContext musb be used in AnForm children!");
  }
  return context;
}
