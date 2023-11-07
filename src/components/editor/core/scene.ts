import { Ref } from "vue";
import { Container } from ".";

/**
 * 画布场景
 * @description 处理平移和缩放事件
 */
export const useScene = (container: Ref<Container>) => {
  const minZoom = 0.5;
  const maxZoom = 10;
  const zoomStep = 0.1;
  let startX = 0;
  let startY = 0;
  let cacheX = 0;
  let cacheY = 0;

  const onMouseDown = (e: MouseEvent) => {
    startX = e.x;
    startY = e.y;
    cacheX = container.value.x;
    cacheY = container.value.y;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    container.value.x = cacheX + (e.x - startX);
    container.value.y = cacheY + (e.y - startY);
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseWheel = (e: WheelEvent) => {
    e.preventDefault();

    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.x) / container.value.zoom;
    const y = (e.clientY - rect.y) / container.value.zoom;
    const delta = -e.deltaY > 0 ? zoomStep : -zoomStep;

    container.value.zoom += delta;
    if (container.value.zoom < minZoom) {
      container.value.zoom = minZoom;
      return;
    }
    if (container.value.zoom > maxZoom) {
      container.value.zoom = maxZoom;
      return;
    }

    container.value.x += -x * delta + el.offsetWidth * (delta / 2);
    container.value.y += -y * delta + el.offsetHeight * (delta / 2);
  };

  return {
    onMouseDown,
    onMouseWheel,
  };
};
