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

export const FormContextKey = Symbol("FormKey") as InjectionKey<FormContextInterface>;
