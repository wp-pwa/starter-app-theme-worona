import { dep } from 'worona-deps';

export const selectorCreators = {
  get getSettings() { return dep('settings', 'selectorCreators', 'getSettings'); },
  get getSetting() { return dep('settings', 'selectorCreators', 'getSetting'); },

  get getCategoryById() { return dep('connection', 'selectorCreators', 'getCategoryById'); },
  get isCategoryReady() { return dep('connection', 'selectorCreators', 'isCategoryReady'); },

  get getPostById() { return dep('connection', 'selectorCreators', 'getPostById'); },
  get isPostReady() { return dep('connection', 'selectorCreators', 'isPostReady'); },

  get getMediaById() { return dep('connection', 'selectorCreators', 'getMediaById'); },
  get isMediaReady() { return dep('connection', 'selectorCreators', 'isMediaReady'); },

  get getUserById() { return dep('connection', 'selectorCreators', 'getUserById'); },
  get isUserReady() { return dep('connection', 'selectorCreators', 'isUserReady'); },

  get getListResults() { return dep('connection', 'selectorCreators', 'getListResults'); },
  get isListReady() { return dep('connection', 'selectorCreators', 'isListReady'); },
};

export const selectors = {
  get getUsersEntities() { return dep('connection', 'selectors', 'getUsersEntities'); },
  get getCategoriesEntities() { return dep('connection', 'selectors', 'getCategoriesEntities'); },
  get getPostsEntities() { return dep('connection', 'selectors', 'getPostsEntities'); },
  get getMediaEntities() { return dep('connection', 'selectors', 'getMediaEntities'); },
};

export const actions = {
  get newCategoriesListRequested() { return dep('connection', 'actions', 'newCategoriesListRequested'); },
};

export const selectors = {
  get isCategoriesReady() { return dep('connection', 'selectors', 'isCategoriesReady'); },
  get isPostsReady() { return dep('connection', 'selectors', 'isPostsReady'); },
  get getPostsById() { return dep('connection', 'selectors', 'getPostsById'); },
  get getCategoriesById() { return dep('connection', 'selectors', 'getCategoriesById'); },
  get getPostsResult() { return dep('connection', 'selectors', 'getPostsResult'); },
  get getCategoriesResult() { return dep('connection', 'selectors', 'getCategoriesResult'); },
};
