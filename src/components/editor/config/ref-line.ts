import { Ref } from "vue";
import { Block } from "./block";
import { Current } from "./context";
import { getClosestValInSortedArr } from "./util";

export interface DragRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * 参考线管理
 */
export class ReferenceLine {
  private xYsMap = new Map<number, number[]>();
  private yXsMap = new Map<number, number[]>();
  private sortedXs: number[] = [];
  private sortedYs: number[] = [];
  private xLines: { y: number; xs: number[] }[] = [];
  private yLines: { x: number; ys: number[] }[] = [];
  public active = ref(false);
  public xl = ref<{ x: number; y: number; w: number }[]>([]);
  public yl = ref<{ x: number; y: number; h: number }[]>([]);

  constructor(private blocks: Ref<Block[]>, private current: Ref<Current>) {
    this.updateRefLine = this.updateRefLine.bind(this);
  }

  /**
   * 记录所有组件坐标
   */
  recordBlocksXY() {
    this.clear();
    const { xYsMap, yXsMap, blocks, current } = this;
    for (const block of blocks.value) {
      if (block === current.value.block) {
        continue;
      }
      const { minX, minY, midX, midY, maxX, maxY } = this.getBlockBox(block);

      this.addBoxToMap(xYsMap, minX, [minY, maxY]);
      this.addBoxToMap(xYsMap, midX, [minY, maxY]);
      this.addBoxToMap(xYsMap, maxX, [minY, maxY]);

      this.addBoxToMap(yXsMap, minY, [minX, maxX]);
      this.addBoxToMap(yXsMap, midY, [minX, maxX]);
      this.addBoxToMap(yXsMap, maxY, [minX, maxX]);
    }
    this.sortedXs = Array.from(xYsMap.keys()).sort((a, b) => a - b);
    this.sortedYs = Array.from(yXsMap.keys()).sort((a, b) => a - b);
  }

  /**
   * 添加组件坐标
   */
  addBoxToMap(map: Map<number, number[]>, xOrY: number, xsOrYs: number[]) {
    if (!map.get(xOrY)) {
      map.set(xOrY, []);
    }
    map.get(xOrY)?.push(...xsOrYs);
  }

  /**
   * 获取组件左中右坐标
   */
  getBlockBox(block: Block) {
    const { x, y, w, h } = block ?? {};
    return {
      minX: x,
      minY: y,
      midX: x + w / 2,
      midY: y + h / 2,
      maxX: x + w,
      maxY: y + h,
    };
  }

  /**
   * 获取组件左中右坐标
   */
  getRectBox(rect: DragRect) {
    const { left: x, top: y, width: w, height: h } = rect;
    return {
      minX: x,
      minY: y,
      midX: x + w / 2,
      midY: y + h / 2,
      maxX: x + w,
      maxY: y + h,
    };
  }

  /**
   * 清理数据
   */
  clear() {
    this.xYsMap.clear();
    this.yXsMap.clear();
    this.sortedXs = [];
    this.sortedYs = [];
    this.xl.value = [];
    this.yl.value = [];
  }

  /**
   * 1. 记录参考线
   * 2. 找出最近的参考线
   * 3. 计算偏移距离
   * 4. 标记参考线段
   * 5. 更新组件坐标
   * 6. 绘制参考线段
   */
  updateRefLine(rect: DragRect) {
    this.xLines = [];
    this.yLines = [];
    const box = this.getRectBox(rect);
    const { xYsMap, yXsMap, sortedXs, sortedYs } = this;
    if (!sortedXs.length && !sortedYs.length) {
      return { x: 0, y: 0 };
    }

    let offsetX: number | undefined = undefined;
    let offsetY: number | undefined = undefined;

    // 离最近X的距离
    const closetMinX = getClosestValInSortedArr(sortedXs, box.minX);
    const closetMidX = getClosestValInSortedArr(sortedXs, box.midX);
    const closetMaxX = getClosestValInSortedArr(sortedXs, box.maxX);
    const distMinX = Math.abs(closetMinX - box.minX);
    const distMidX = Math.abs(closetMidX - box.midX);
    const distMaxX = Math.abs(closetMaxX - box.maxX);
    const closetDistX = Math.min(distMinX, distMidX, distMaxX);

    // 离最近Y的距离
    const closetMinY = getClosestValInSortedArr(sortedYs, box.minY);
    const closetMidY = getClosestValInSortedArr(sortedYs, box.midY);
    const closetMaxY = getClosestValInSortedArr(sortedYs, box.maxY);
    const distMinY = Math.abs(closetMinY - box.minY);
    const distMidY = Math.abs(closetMidY - box.midY);
    const distMaxY = Math.abs(closetMaxY - box.maxY);
    const closetDistY = Math.min(distMinY, distMidY, distMaxY);

    const isEqualNum = (a: number, b: number) => Math.abs(a - b) < 0.00001;
    const tol = 5 / 0.7;

    if (closetDistX <= tol) {
      if (isEqualNum(closetDistX, distMinX)) {
        offsetX = closetMinX - box.minX;
      } else if (isEqualNum(closetDistX, distMidX)) {
        offsetX = closetMidX - box.midX;
      } else if (isEqualNum(closetDistX, distMaxX)) {
        offsetX = closetMaxX - box.maxX;
      } else {
        throw new Error("un");
      }
    }

    if (closetDistY <= tol) {
      if (isEqualNum(closetDistY, distMinY)) {
        offsetY = closetMinY - box.minY;
      } else if (isEqualNum(closetDistY, distMidY)) {
        offsetY = closetMidY - box.midY;
      } else if (isEqualNum(closetDistY, distMaxY)) {
        offsetY = closetMaxY - box.maxY;
      } else {
        throw new Error("un");
      }
    }

    const targetBox = { ...box };

    if (offsetX !== undefined) {
      targetBox.minX += offsetX;
      targetBox.midX += offsetX;
      targetBox.maxX += offsetX;
    }

    if (offsetY !== undefined) {
      targetBox.minY += offsetY;
      targetBox.midY += offsetY;
      targetBox.maxY += offsetY;
    }

    if (offsetX !== undefined) {
      if (isEqualNum(0, closetMinX - targetBox.minX)) {
        this.yLines.push({
          x: closetMinX,
          ys: [targetBox.minY, targetBox.maxY, ...(xYsMap.get(closetMinX) ?? [])],
        });
      }
      if (isEqualNum(0, closetMidX - targetBox.midX)) {
        this.yLines.push({
          x: closetMidX,
          ys: [targetBox.midX, ...(xYsMap.get(closetMidX) ?? [])],
        });
      }
      if (isEqualNum(0, closetMaxX - targetBox.maxX)) {
        this.yLines.push({
          x: closetMaxX,
          ys: [targetBox.minY, targetBox.maxY, ...(xYsMap.get(closetMaxX) ?? [])],
        });
      }
    }

    if (offsetY !== undefined) {
      if (isEqualNum(0, closetMinY - targetBox.minY)) {
        this.xLines.push({
          y: closetMinY,
          xs: [targetBox.minX, targetBox.maxX, ...(yXsMap.get(closetMinY) ?? [])],
        });
      }
      if (isEqualNum(0, closetMidY - targetBox.midY)) {
        this.xLines.push({
          y: closetMidY,
          xs: [targetBox.midX, ...(yXsMap.get(closetMidY) ?? [])],
        });
      }
      if (isEqualNum(0, closetMaxY - targetBox.maxY)) {
        this.xLines.push({
          y: closetMaxY,
          xs: [targetBox.minX, targetBox.maxX, ...(yXsMap.get(closetMaxY) ?? [])],
        });
      }
    }

    const yl: any[] = [];
    for (const line of this.yLines) {
      const y = Math.min(...line.ys);
      const h = Math.max(...line.ys) - y;
      yl.push({ x: line.x, y, h });
    }

    const xl: any[] = [];
    for (const line of this.xLines) {
      const x = Math.min(...line.xs);
      const w = Math.max(...line.xs) - x;
      xl.push({ y: line.y, x, w });
    }

    this.yl.value = yl;
    this.xl.value = xl;

    return {
      x: offsetX,
      y: offsetY,
    };
  }
}
