import { dep } from 'worona-deps';

export const selectorCreators = {
  get getSettings() { return dep('settings', 'selectorCreators', 'getSettings'); },
  get getSetting() { return dep('settings', 'selectorCreators', 'getSetting'); },
};

export const selectors = {
  get getCategoriesById() { return dep('connection', 'selectors', 'getCategoriesById'); },
  get getCategoriesResult() { return dep('connection', 'selectors', 'getCategoriesResult'); },
  get isCategoriesReady() { return dep('connection', 'selectors', 'isCategoriesReady'); },
  get getPostsById() { return dep('connection', 'selectors', 'getPostsById'); },
  get getPostsResult() { return dep('connection', 'selectors', 'getPostsResult'); },
  get isPostsReady() { return dep('connection', 'selectors', 'isPostsReady'); },
  get getPostsParams() { return dep('connection', 'selectors', 'getPostsParams'); },
  get getTagsById() { return dep('connection', 'selectors', 'getTagsById'); },
  get getFeaturedMediasById() { return dep('connection', 'selectors', 'getFeaturedMediasById'); },
  get getAuthorsById() { return dep('connection', 'selectors', 'getAuthorsById'); },
};
