import { createPinia } from 'pinia';
import persistedstatePlugin from 'pinia-plugin-persistedstate';

const store = createPinia();

store.use(persistedstatePlugin);

export { store };
