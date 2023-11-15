export function useVisible(initial = false) {
  const visible = ref(initial);
  const show = () => (visible.value = true);
  const hide = () => (visible.value = false);
  const toggle = () => (visible.value = !visible.value);

  return {
    visible,
    show,
    hide,
    toggle,
  };
}
