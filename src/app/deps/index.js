import { dep } from 'worona-deps';

export const selectorCreators = {
  get getSettings() { return dep('settings', 'selectorCreators', 'getSettings'); },
};
