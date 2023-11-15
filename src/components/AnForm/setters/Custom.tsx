import { defineSetter } from './util';

export default defineSetter<{ a: number }, '11'>({
  setter: () => '1',
});
