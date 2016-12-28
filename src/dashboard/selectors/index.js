import * as deps from '../deps';

export const getThemeSettings = state =>
  deps.selectorCreators.getSettingsCreator('starter-app-theme-worona')(state);
