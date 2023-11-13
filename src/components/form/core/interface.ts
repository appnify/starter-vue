import { InjectionKey } from "vue";
import { FormRef } from "./useFormRef";
import { FormSubmit } from "./useFormSubmit";
import { FormItems } from "./useFormItems";
import { FormModel } from "./useFormModel";

export type FormContextInterface = FormModel & FormItems & FormRef & FormSubmit;

export const FormContext = Symbol("FormKey") as InjectionKey<FormContextInterface>;
