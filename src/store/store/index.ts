import { createPinia } from "pinia";
import persistedstatePlugin from "pinia-plugin-persistedstate";

export const store = createPinia();
store.use(persistedstatePlugin);
