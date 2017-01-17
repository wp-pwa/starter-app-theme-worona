import { dep } from 'worona-deps';

export const selectorCreators = {
  get getSettings() { return dep('settings', 'selectorCreators', 'getSettings'); },
};

export const selectors = {
  get isCategoriesReady() { return dep('connection', 'selectors', 'isCategoriesReady'); },
  get isPostsReady() { return dep('connection', 'selectors', 'isPostsReady'); },
  get getPostsById() { return dep('connection', 'selectors', 'getPostsById'); },
  get getCategoriesById() { return dep('connection', 'selectors', 'getCategoriesById'); },
  get getPostsResult() { return dep('connection', 'selectors', 'getPostsResult'); },
  get getCategoriesResult() { return dep('connection', 'selectors', 'getCategoriesResult'); },
};
