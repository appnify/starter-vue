import { Button } from '@arco-design/web-vue';

export function useModalTrigger(props: any, open: () => void) {
  const modalTrigger = () => {
    if (!props.trigger) {
      return null;
    }
    if (typeof props.trigger === 'function') {
      return <props.trigger model={props.model} items={props.items} open={open}></props.trigger>;
    }
    const internal = {
      text: '新增',
      buttonProps: {},
      buttonSlots: {},
    };
    if (typeof props.trigger === 'string') {
      internal.text = props.trigger;
    }
    if (typeof props.trigger === 'object') {
      Object.assign(internal, props.trigger);
    }
    return (
      <Button type="primary" {...internal.buttonProps} onClick={open}>
        {{
          ...internal.buttonSlots,
          icon: () => <i class="icon-park-outline-add"></i>,
          default: () => internal.text,
        }}
      </Button>
    );
  };
  return modalTrigger;
}
