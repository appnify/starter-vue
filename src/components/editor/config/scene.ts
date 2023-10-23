import { Ref } from "vue";
import { Container } from ".";

/**
 * 场景
 * @description 处理平移和缩放事件
 */
export class Scene {
  private startX = 0;
  private startY = 0;
  private cacheX = 0;
  private cacheY = 0;
  public minZoom = 0.5;
  public maxZoom = 10;
  public zoomStep = 0.1;

  constructor(private container: Ref<Container>) {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this);
  }

  onMouseDown(e: MouseEvent) {
    this.startX = e.x;
    this.startY = e.y;
    this.cacheX = this.container.value.x;
    this.cacheY = this.container.value.y;
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
  }

  onMouseMove(e: MouseEvent) {
    this.container.value.x = this.cacheX + (e.x - this.startX);
    this.container.value.y = this.cacheY + (e.y - this.startY);
  }

  onMouseUp() {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
  }

  onMouseWheel(e: WheelEvent) {
    e.preventDefault();

    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.x) / this.container.value.zoom;
    const y = (e.clientY - rect.y) / this.container.value.zoom;
    const delta = -e.deltaY > 0 ? this.zoomStep : -this.zoomStep;

    this.container.value.zoom += delta;
    if (this.container.value.zoom < this.minZoom) {
      this.container.value.zoom = this.minZoom;
      return;
    }
    if (this.container.value.zoom > this.maxZoom) {
      this.container.value.zoom = this.maxZoom;
      return;
    }

    this.container.value.x += -x * delta + el.offsetWidth * (delta / 2);
    this.container.value.y += -y * delta + el.offsetHeight * (delta / 2);
  }
}
