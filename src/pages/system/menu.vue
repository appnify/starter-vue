<template>
  <AnPage class="">
    <div class="mb-3 flex items-center justify-between gap-4">
      <div>
        <a-button type="primary" @click="MenuModal.open"> 保存 </a-button>
      </div>
      <div>
        <a-input-search v-model="keyword" placeholder="搜索菜单" :allow-clear="true" @press-enter="onSearchMenus" @clear="onSearchMenus" @search="onSearchMenus"></a-input-search>
      </div>
    </div>
    <div class="h-10 px-3 rounded flex items-center justify-between bg-[var(--color-neutral-2)]">
      <div class="flex items-center gap-2">
        <a-checkbox></a-checkbox>
        菜单名称
      </div>
      <div>操作</div>
    </div>
    <div class="menu-tree">
      <a-tree
        :data="treeData"
        :block-node="true"
        :size="'large'"
        :checkable="true"
        :draggable="true"
        :field-names="{ key: 'id', title: 'title', icon: 'iconRender' }"
        @drop="onDrop"
      >
        <template #icon="{ node }">
          <i :class="node.icon"></i>
        </template>
        <template #extra="node">
          <div class="mr-8 ml-2">
            <a-tag :bordered="true" :color="MenuTypes.fmt(node.type, 'color')">
              {{ MenuTypes.fmt(node.type) }}
            </a-tag>
          </div>
          <div class="flex gap-2">
            <a-link @click="MenuModal.open">新增</a-link>
            <a-link @click="MenuModal.open(node)">修改</a-link>
            <a-link @click="onDeleteMenu(node)" status="danger">删除</a-link>
          </div>
        </template>
        <template #title="node">
          <div class="inline-flex items-center justify-between gap-4">
            <div class="">
              {{ node.title }}
            </div>
            <div></div>
          </div>
        </template>
      </a-tree>
      <MenuModal></MenuModal>
    </div>
  </AnPage>
</template>

<script setup lang="tsx">
import { MenuType, MenuTypes } from '@/constants/menu'
import { MenuItem, mapRoutesToMenus } from '@/router/menus'
import { APP_ROUTE_NAME, routesMap } from '@/router/routes'
import { TreeNodeData } from '@arco-design/web-vue'
import { useFormModal, useTable } from 'arconify'

defineOptions({
  name: 'SystemMenuPage',
})

definePage({
  meta: {
    name: 'SystemMenuPage',
    icon: 'i-icon-park-outline-add-subtract',
    componentName: 'SystemMenuPage',
    sort: 10302,
    title: '菜单管理',
    auth: 'system_menu_page',
  },
})

interface Menu extends Omit<MenuItem, 'children'> {
  id: number
  type: MenuType
  children: Menu[]
}
const useMenus = () => {
  let id = 1
  const items = mapRoutesToMenus(routesMap.get(APP_ROUTE_NAME)?.children ?? []) as Menu[]
  treeEach(items, menu => {
    menu.id = id++
    if (menu.children && menu.children.length) {
      menu.type = MenuType.MENU
      return
    }
    menu.type = MenuType.PAGE
  })
  return ref(items)
}

const menus = useMenus()

const onDrop = ({ dragNode, dropNode, dropPosition }) => {
  const data = menus.value
  const loop = (data, id, callback) => {
    data.some((item, index, arr) => {
      if (item.id === id) {
        callback(item, index, arr)
        return true
      }
      if (item.children) {
        return loop(item.children, id, callback)
      }
      return false
    })
  }

  loop(data, dragNode.id, (_, index, arr) => {
    arr.splice(index, 1)
  })

  if (dropPosition === 0) {
    loop(data, dropNode.id, item => {
      item.children = item.children || []
      item.children.push(dragNode)
    })
  } else {
    loop(data, dropNode.id, (_, index, arr) => {
      arr.splice(dropPosition < 0 ? index : index + 1, 0, dragNode)
    })
  }
}

const keyword = ref('')
const treeData = ref(menus.value)
const onSearchMenus = v => {
  treeData.value = searchData(keyword.value)
}

function searchData(keyword) {
  const loop = data => {
    const result: Menu[] = []
    data.forEach(item => {
      if (item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
        result.push({ ...item })
      } else if (item.children) {
        const filterData = loop(item.children)
        if (filterData.length) {
          result.push({
            ...item,
            children: filterData,
          })
        }
      }
    })
    return result
  }
  return loop(menus.value)
}

const onDeleteMenu = async (node: TreeNodeData) => {
  await delConfirm()
}

const MenuModal = useFormModal({
  trigger: false,
  modalProps: {
    title: '新建菜单',
    width: 732,
  },
  formProps: {
    class: '!grid grid-cols-2 gap-x-4',
  },
  items: [
    {
      field: 'parentId',
      value: 0,
      label: '父级',
      setter: 'treeSelect',
      setterProps: {
        fieldNames: {
          key: 'id',
          title: 'name',
        },
      },
      async options() {
        return [
          {
            id: 0,
            name: '全部',
            children: [],
          },
        ]
      },
    },
    {
      field: 'type',
      value: 1,
      label: '类型',
      setter: 'select',
      options: MenuTypes.raw,
    },
    {
      field: 'title',
      label: '名称',
      setter: 'input',
      required: true,
    },
    {
      field: 'icon',
      label: '图标',
      setter: 'input',
      required: true,
      visible: ({ model }) => model.type !== MenuType.BUTTON,
    },
    {
      field: 'code',
      label: '标识',
      setter: 'input',
      required: true,
      visible: ({ model }) => model.type == MenuType.BUTTON,
    },
    {
      field: 'path',
      label: '路径',
      setter: 'input',
      required: true,
      visible: ({ model }) => model.type !== MenuType.MENU,
      setterProps: {
        placeholder: '内链请以 / 开头，外链请以 http 开头',
      },
      rules: [
        {
          match: /^(\/|http)/,
          message: '请以 / 或 http 开头',
        },
      ],
    },
    {
      field: 'component',
      label: '关联组件',
      setter: 'select',
      required: true,
      visible: ({ model }) => model.type === MenuType.PAGE,
      options: () => {
        const routes = [...routesMap.values()]
        return routes.map(route => {
          return {
            label: (route.name as string).replace('/', '').replaceAll('/', '::'),
            value: route.name as string,
          }
        })
      },
      setterProps: {
        placeholder: '当前页面对应的前端组件',
      },
    },
    {
      field: 'description',
      label: '菜单描述',
      setter: 'textarea',
      itemProps: {
        class: 'col-span-2',
      },
    },
  ],
  submit: model => {},
})

const MenuTable = useTable({
  data: async search => {
    return menus.value
  },
  columns: [
    {
      title: '权限名称',
      dataIndex: 'name',
      render({ record }) {
        let id = ''
        if (record.type === MenuType.PAGE) {
          id = ` => ${record.path}`
        }
        if (record.type === MenuType.BUTTON) {
          id = ` => ${record.code}`
        }
        return (
          <div class="flex-1">
            <i class={`${record.icon} mr-1`}></i>
            <span>{record.title ?? '无'}</span>
            <span class="text-gray-400 text-xs truncate">{id}</span>
          </div>
        )
      },
    },
    {
      title: '标识',
      width: 200,
      dataIndex: 'code',
    },
    {
      title: '类型',
      width: 100,
      align: 'center',
      render: ({ record }) => (
        <a-tag bordered color={MenuTypes.fmt(record.type, 'color')}>
          {{
            default: () => MenuTypes.fmt(record.type),
          }}
        </a-tag>
      ),
    },
    {
      title: '操作',
      type: 'button',
      width: 200,
      buttons: [
        {
          text: '新增',
          disable: ({ record }) => record.type === MenuType.BUTTON,
          onClick: ({ record }) => {
            console.log(record)
          },
        },
        {
          type: 'modify',
          text: '修改',
        },
        {
          text: '删除',
          type: 'delete',
          onClick: ({ record }) => {},
        },
      ],
    },
  ],
  tableProps: {
    expandable: {},
    draggable: {
      title: '拖拽',
      type: 'handle',
    },
  },
  paging: {
    showTotal: true,
    showPageSize: false,
  },
  search: [
    {
      field: 'name',
      label: '菜单名称',
      required: false,
      setter: 'search',
    },
  ],
  create: {
    modalProps: {
      title: '新建菜单',
      width: 980,
    },
    formProps: {
      class: '!grid grid-cols-2 gap-x-4',
    },
    items: [
      {
        field: 'parentId',
        value: 0,
        label: '父级',
        setter: 'treeSelect',
        setterProps: {
          fieldNames: {
            key: 'id',
            title: 'name',
          },
        },
        async options() {
          return [
            {
              id: 0,
              name: '全部',
              children: [],
            },
          ]
        },
      },
      {
        field: 'type',
        value: 1,
        label: '类型',
        setter: 'select',
        options: MenuTypes.raw,
      },
      {
        field: 'title',
        label: '名称',
        setter: 'input',
        required: true,
      },
      {
        field: 'icon',
        label: '图标',
        setter: 'input',
        required: true,
        visible: ({ model }) => model.type !== MenuType.BUTTON,
      },
      {
        field: 'code',
        label: '标识',
        setter: 'input',
        required: true,
        visible: ({ model }) => model.type == MenuType.BUTTON,
      },
      {
        field: 'path',
        label: '路径',
        setter: 'input',
        required: true,
        visible: ({ model }) => model.type !== MenuType.MENU,
        setterProps: {
          placeholder: '内链请以 / 开头，外链请以 http 开头',
        },
        rules: [
          {
            match: /^(\/|http)/,
            message: '请以 / 或 http 开头',
          },
        ],
      },
      {
        field: 'component',
        label: '关联组件',
        setter: 'select',
        required: true,
        visible: ({ model }) => model.type === MenuType.PAGE,
        options: () => {
          const routes = [...routesMap.values()]
          return routes.map(route => {
            return {
              label: (route.name as string).replace('/', '').replaceAll('/', '::'),
              value: route.name as string,
            }
          })
        },
        setterProps: {
          placeholder: '当前页面对应的前端组件',
        },
      },
      {
        field: 'description',
        label: '菜单描述',
        setter: 'textarea',
        itemProps: {
          class: 'col-span-2',
        },
      },
    ],
    submit: model => {},
  },
  modify: {
    extend: true,
    submit: model => {},
  },
})
</script>

<style lang="less">
.arco-table-cell-expand-icon {
  span.arco-table-cell-inline-icon {
    margin-right: 6px;
  }
}
.menu-tree {
  .arco-tree-node {
    height: 44px;
    padding-left: 12px;
    padding-right: 12px;
    border-bottom: 1px solid var(--color-neutral-3);
  }
}
</style>
