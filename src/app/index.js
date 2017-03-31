/* eslint-disable global-require, import/no-dynamic-require */
import './style.sass';
import * as reducers from './reducers';
import * as components from './components';
import * as sagas from './sagas';
import * as deps from './deps';

const locales = lang => require(`./locales/${lang}.json`);

export {
  reducers,
  components,
  deps,
  sagas,
  locales,
};
