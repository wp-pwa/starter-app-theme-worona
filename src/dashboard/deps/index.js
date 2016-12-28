import { dep } from 'worona-deps';

export const elements = {
  get Button() { return dep('theme', 'elements', 'Button'); },
  get Icon() { return dep('theme', 'elements', 'Icon'); },
  get Switch() { return dep('theme', 'elements', 'Switch'); },
  get RootContainer() { return dep('theme', 'elements', 'RootContainer'); },
};

export const actions = {
  get saveSettingsRequested() { return dep('settings', 'actions', 'saveSettingsRequested'); },
};

export const selectors = {
  get getSelectedSiteId() { return dep('router', 'selectors', 'getSelectedSiteId'); },
};

export const selectorCreators = {
  get getSettingsCreator() { return dep('settings', 'selectorCreators', 'getSettingsCreator'); },
};

export const types = {
  get DEFAULT_SETTINGS_NEEDED() { return dep('settings', 'types', 'DEFAULT_SETTINGS_NEEDED'); },
};
