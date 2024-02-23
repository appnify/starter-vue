import { Container, defaultContainer } from './container';
import { Block } from './block';
import { useReferenceLine } from './ref-line';
import { BlockerMap } from '../blocks';
import { cloneDeep } from 'lodash-es';
import { CSSProperties, InjectionKey } from 'vue';
import { useScene } from './scene';

export const useEditor = () => {
  /**
   * 画布设置
   */
  const container = ref<Container>({ ...defaultContainer });
  /**
   * 选中组件
   */
  const currentBlock = ref<Block | null>(null);
  /**
   * 参考线
   */
  const refLine = useReferenceLine(container);
  /**
   * 画布移动和缩放
   */
  const scene = useScene(container);

  /**
   * 添加组件
   * @param type 组件类型
   * @param x 横坐标
   * @param y 纵坐标
   * @returns
   */
  const addBlock = (type: string, x = 0, y = 0) => {
    if (!type) {
      return;
    }
    const blocker = BlockerMap[type];
    if (!blocker) {
      return;
    }
    const ids = container.value.children.map(i => Number(i.id));
    const maxId = ids.length ? Math.max.apply(null, ids) : 0;
    const id = (maxId + 1).toString();
    const title = `${blocker.title}${id}`;
    container.value.children.push({ ...cloneDeep(blocker.initial), id, x, y, title });
  };

  /**
   * 移除组件
   * @param block 组件
   */
  const rmBlock = (block: Block) => {
    const index = container.value.children.indexOf(block);
    if (index > -1) {
      container.value.children.splice(index, 1);
    }
  };

  /**
   * 格式化组件样式
   * @param block 组件
   * @returns
   */
  const formatBlockStyle = (block: Block) => {
    const { bgColor, bgImage } = block;
    return {
      backgroundColor: bgColor,
      backgroundImage: bgImage ? `url(${bgImage})` : undefined,
      backgroundSize: '100% 100%',
    };
  };

  /**
   * 格式化容器样式
   * @param container 容器
   * @returns
   */
  const formatContainerStyle = (container: Container) => {
    const { width, height, bgColor, bgImage, zoom, x, y } = container;
    return {
      position: 'absolute',
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: bgColor,
      backgroundImage: bgImage ? `url(${bgImage})` : undefined,
      backgroundSize: '100% 100%',
      transform: `translate3d(${x}px, ${y}px, 0) scale(${zoom})`,
    } as CSSProperties;
  };

  /**
   * 设置当前选中组件
   * @param block 组件
   */
  const setCurrentBlock = (block: Block | null) => {
    for (const item of container.value.children) {
      item.actived = false;
    }
    if (!block) {
      currentBlock.value = null;
    } else {
      block.actived = true;
      currentBlock.value = block;
    }
  };

  /**
   * 重置画布坐标和比例
   */
  const setContainerOrigin = () => {
    container.value.x = 0;
    container.value.y = 0;
    const el = document.querySelector('.juetan-editor-container');
    if (el) {
      const { width, height } = el.getBoundingClientRect();
      const wZoom = width / container.value.width;
      const hZoom = height / container.value.width;
      const zoom = Math.floor((wZoom > hZoom ? wZoom : hZoom) * 10000) / 10000;
      container.value.zoom = zoom;
    }
  };

  return {
    container,
    currentBlock,
    refLine,
    scene,
    BlockerMap,
    setCurrentBlock,
    setContainerOrigin,
    addBlock,
    rmBlock,
    formatBlockStyle,
    formatContainerStyle,
  };
};

export const EditorKey = Symbol('EditorKey') as InjectionKey<ReturnType<typeof useEditor>>;
