import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as deps from '../deps';

export function* saveDefaults(action) {
  yield put(deps.actions.saveSettingsRequested({
    chosenColor: '#4A90E2',
    displayFeaturedImage: false,
    displayCategories: false,
  }, {
    name: 'starter-app-theme-worona',
    siteId: action.siteId,
  }));
}

export default function* testSagas() {
  yield [
    takeEvery(action => action.type === deps.types.DEFAULT_SETTINGS_NEEDED
      && action.name === 'starter-app-theme-worona',
      saveDefaults),
  ];
}
