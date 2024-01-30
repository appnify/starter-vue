import { ButtonProps, TableData } from '@arco-design/web-vue';

export interface AnTableActionBase {
  text: string;
  icon: string | Component;
  visible: () => boolean;
  disable: () => boolean;
  buttonProps: ButtonProps;
}

interface AnTableActionBatch {
  type: 'batch';
  onClick: (rows: TableData) => void;
}

export type AnTableAction = AnTableActionBase & AnTableActionBatch;
