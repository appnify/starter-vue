import { CSSProperties, Component } from 'vue';
import { Block } from './block';
import { Container, defaultContainer } from './container';
import { cloneDeep } from 'lodash-es';
import { useReferenceLine } from './ref-line';
import { useScene } from './scene';

export interface BlockItem {
  /**
   * 需唯一
   */
  type: string;
  /**
   * 图标
   */
  icon: string;
  /**
   * 名字
   */
  title: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 在组件库时的渲染
   */
  pickRender?: any;
  /**
   * 在列表中时的渲染
   */
  listRender?: any;
  /**
   * 在编辑中时的渲染
   */
  showRender?: any;
  /**
   * 在预览中时的渲染
   */
  viewRender?: any;
  /**
   * 编辑属性时的渲染
   */
  editRender?: any;
  /**
   * 初始化默认参数
   */
  onInit?: any;
  /**
   * 转换数据
   */
  onLoad?: any;
  /**
   * 转换数据
   */
  onSave?: any;
}

interface SortableRender {
  name: string;
  sort?: number;
  render: Component;
}

export interface Plugin {
  /**
   * 名字需唯一
   */
  name: string;
  /**
   * 须有唯一的 name 属性
   */
  hlRender?: SortableRender;
  /**
   * 须有唯一的 name 属性
   */
  hrRender?: SortableRender;
  /**
   * 须有唯一的 name 属性
   */
  ltRender?: SortableRender;
  /**
   * 须有唯一的 name 属性
   */
  lbRender?: SortableRender;
  /**
   * 须有唯一的 name 属性
   */
  mlRender?: SortableRender;
  /**
   * 须有唯一的 name 属性
   */
  mrRender?: SortableRender;
  /**
   * 须有唯一的 name 属性
   */
  rtRender?: SortableRender;
  rbRender?: () => BlockItem;
  addBlockItem?: () => BlockItem;
  blockItems?: BlockItem | BlockItem[];
  onInit?: (context: any) => void;
  onSave?: () => void;
  onLoad?: (data: any) => void;
}

export const usePluginContext = (pluginlist: Plugin[]) => {
  const container: Ref<Container> = ref(cloneDeep(defaultContainer)) as any;
  const blocks = computed(() => container.value.children);
  const blockerMap: Record<string, BlockItem> = {};
  const refLine = useReferenceLine(container);
  const scene = useScene(container);

  /** 顶部栏左侧 */
  const HL: Ref<SortableRender[]> = ref([]);
  /** 顶部栏右侧 */
  const HR: Ref<SortableRender[]> = ref([]);
  /** 左侧栏顶部 */
  const LC: Ref<SortableRender[]> = ref([]);
  /** 左侧栏底部 */
  const LB: Ref<SortableRender[]> = ref([]);
  /** 中间栏左侧 */
  const ML: Ref<SortableRender[]> = ref([]);
  /** 中间栏右侧 */
  const MR: Ref<SortableRender[]> = ref([]);
  /** 右侧栏顶部 */
  const RC: Ref<SortableRender[]> = ref([]);

  function load(data: any) {
    data.children = data.children.map(item => {
      return blockerMap[item.type]?.onLoad?.(item) ?? item;
    });
    for (const plugin of pluginlist) {
      data = plugin.onLoad?.(data) ?? data;
    }
    return data;
  }

  function save(container: Container) {}

  function addBlock(type: string, x = 0, y = 0) {
    const blocker = blockerMap[type];
    if (!type) {
      return;
    }
    if (!blocker) {
      return;
    }
    const ids = blocks.value.map(i => Number(i.id));
    const maxId = ids.length ? Math.max.apply(null, ids) : 0;
    const id = (maxId + 1).toString();
    const title = `${blocker.title}${id}`;
    const block = { ...cloneDeep(blocker.onInit?.()), id, x, y, title };
    blocks.value.push(block);
  }

  function rmBlock(block: Block) {
    const index = blocks.value.indexOf(block);
    if (index > -1) {
      blocks.value.splice(index, 1);
    }
  }

  function setCurrentBlock(block: Block | null) {
    for (const item of container.value.children) {
      item.actived = false;
    }
    if (!block) {
      container.value.current = null;
    } else {
      block.actived = true;
      container.value.current = block;
    }
  }

  function setContainerOrigin() {
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
  }

  const context = {
    container,
    blockerMap,
    refLine,
    scene,
    HL,
    HR,
    LB,
    LC,
    ML,
    MR,
    RC,
    setCurrentBlock,
    setContainerOrigin,
    addBlock,
    rmBlock,
  };

  function addRender(list: any[], render?: SortableRender) {
    if (!render) {
      return;
    }
    if (list.some(i => i.name === render.name)) {
      console.log('name has existed');
      return;
    }
    list.push(render);
  }

  for (const plugin of pluginlist) {
    plugin.onInit?.(context);
    addRender(HL.value, plugin.hlRender);
    addRender(HR.value, plugin.hrRender);
    addRender(LC.value, plugin.ltRender);
    addRender(LB.value, plugin.lbRender);
    addRender(ML.value, plugin.mlRender);
    addRender(MR.value, plugin.mrRender);
    addRender(RC.value, plugin.rtRender);
    const bi = plugin.addBlockItem?.();
    if (bi) {
      blockerMap[bi.type] = bi;
    }
  }

  HL.value.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
  HR.value.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
  LC.value.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
  LB.value.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
  ML.value.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
  MR.value.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
  RC.value.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

  return context;
};

export const ContextKey = Symbol('ContextKey') as InjectionKey<ReturnType<typeof usePluginContext>>;

function corePlugin(): Plugin {
  return {
    name: 'core',
    rtRender: {
      name: 'ss',
      render() {
        return () => 123;
      },
    },
  };
}
