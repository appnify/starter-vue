import { Ref } from "vue";
import { getClosestValInSortedArr } from "../utils/closest";
import { Block } from "./block";
import { Container } from "./container";

/**
 * 组件参考线
 * @param blocks 组件列表
 * @param current 当前组件
 * @returns
 */
export const useReferenceLine = (container: Ref<Container>) => {
  let xYsMap = new Map<number, number[]>();
  let yXsMap = new Map<number, number[]>();
  let sortedXs: number[] = [];
  let sortedYs: number[] = [];
  const active = ref(false);
  const xLines = ref<{ x: number; y: number; w: number }[]>([]);
  const yLines = ref<{ x: number; y: number; h: number }[]>([]);

  /**
   * 记录所有组件坐标
   */
  const recordBlocksXY = () => {
    clear();
    for (const block of container.value.children) {
      if (block === container.value.current) {
        continue;
      }
      const { minX, minY, midX, midY, maxX, maxY } = getBlockBox(block);
      addBoxToMap(xYsMap, minX, [minY, maxY]);
      addBoxToMap(xYsMap, midX, [minY, maxY]);
      addBoxToMap(xYsMap, maxX, [minY, maxY]);

      addBoxToMap(yXsMap, minY, [minX, maxX]);
      addBoxToMap(yXsMap, midY, [minX, maxX]);
      addBoxToMap(yXsMap, maxY, [minX, maxX]);
    }
    sortedXs = Array.from(xYsMap.keys()).sort((a, b) => a - b);
    sortedYs = Array.from(yXsMap.keys()).sort((a, b) => a - b);
  };

  /**
   * 添加组件坐标
   */
  const addBoxToMap = (map: Map<number, number[]>, xOrY: number, xsOrYs: number[]) => {
    if (!map.get(xOrY)) {
      map.set(xOrY, []);
    }
    map.get(xOrY)?.push(...xsOrYs);
  };

  /**
   * 获取组件左中右坐标
   */
  const getBlockBox = (block: Block) => {
    const { x, y, w, h } = block ?? {};
    return {
      minX: x,
      minY: y,
      midX: x + w / 2,
      midY: y + h / 2,
      maxX: x + w,
      maxY: y + h,
    };
  };

  /**
   * 获取组件左中右坐标
   */
  const getRectBox = (rect: DragRect) => {
    const { left: x, top: y, width: w, height: h } = rect;
    return {
      minX: x,
      minY: y,
      midX: x + w / 2,
      midY: y + h / 2,
      maxX: x + w,
      maxY: y + h,
    };
  };

  /**
   * 清理数据
   */
  function clear() {
    xYsMap.clear();
    yXsMap.clear();
    sortedXs = [];
    sortedYs = [];
    xLines.value = [];
    yLines.value = [];
  }

  /**
   * 1. 记录参考线
   * 2. 找出最近的参考线
   * 3. 计算偏移距离
   * 4. 标记参考线段
   * 5. 更新组件坐标
   * 6. 绘制参考线段
   */
  function updateRefLine(rect: DragRect) {
    const allXLines: any[] = [];
    const allYLines: any[] = [];
    const box = getRectBox(rect);
    let offsetX: number | undefined;
    let offsetY: number | undefined;
    if (!sortedXs.length && !sortedYs.length) {
      return { x: 0, y: 0 };
    }

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
        throw new Error('un');
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
        throw new Error('un');
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
        allYLines.push({
          x: closetMinX,
          ys: [targetBox.minY, targetBox.maxY, ...(xYsMap.get(closetMinX) ?? [])],
        });
      }
      if (isEqualNum(0, closetMidX - targetBox.midX)) {
        allYLines.push({
          x: closetMidX,
          ys: [targetBox.midX, ...(xYsMap.get(closetMidX) ?? [])],
        });
      }
      if (isEqualNum(0, closetMaxX - targetBox.maxX)) {
        allYLines.push({
          x: closetMaxX,
          ys: [targetBox.minY, targetBox.maxY, ...(xYsMap.get(closetMaxX) ?? [])],
        });
      }
    }

    if (offsetY !== undefined) {
      if (isEqualNum(0, closetMinY - targetBox.minY)) {
        allXLines.push({
          y: closetMinY,
          xs: [targetBox.minX, targetBox.maxX, ...(yXsMap.get(closetMinY) ?? [])],
        });
      }
      if (isEqualNum(0, closetMidY - targetBox.midY)) {
        allXLines.push({
          y: closetMidY,
          xs: [targetBox.midX, ...(yXsMap.get(closetMidY) ?? [])],
        });
      }
      if (isEqualNum(0, closetMaxY - targetBox.maxY)) {
        allXLines.push({
          y: closetMaxY,
          xs: [targetBox.minX, targetBox.maxX, ...(yXsMap.get(closetMaxY) ?? [])],
        });
      }
    }

    const yls: any[] = [];
    for (const line of allYLines) {
      const y = Math.min(...line.ys);
      const h = Math.max(...line.ys) - y;
      yls.push({ x: line.x, y, h });
    }

    const xls: any[] = [];
    for (const line of allXLines) {
      const x = Math.min(...line.xs);
      const w = Math.max(...line.xs) - x;
      xls.push({ y: line.y, x, w });
    }

    yLines.value = yls;
    xLines.value = xls;

    return {
      offsetX,
      offsetY,
    };
  }

  return {
    active,
    xLines,
    yLines,
    recordBlocksXY,
    updateRefLine,
  };
};

export interface DragRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export type ReferenceLine = ReturnType<typeof useReferenceLine>;
