/* eslint-disable no-undef */
import { select, fork } from 'redux-saga/effects';
import { isIos } from 'worona-deps';
import { blackOrWhite } from '../libs';
import * as deps from '../deps';

function* colorStatusBar() {
  const contentType = yield select(deps.selectors.getContentType);
  const color = yield select(deps.selectorCreators.getSetting('theme', 'chosenColor'));
  console.log(contentType);
  if (contentType === 'Post' || contentType === 'Page') {
    // White background and dark text.
    StatusBar.backgroundColorByHexString('#FFF');
    StatusBar.styleDefault();
  } else {
    // background of same color than app and text depending on blackOrWhite color.
    StatusBar.backgroundColorByHexString(color);
    if (blackOrWhite(color) === '#FFF') StatusBar.styleLightContent();
    else StatusBar.styleDefault();
  }
}

export default function* starterProSagas() {
  if (isIos && StatusBar) {
    StatusBar.overlaysWebView(false);
    yield fork(colorStatusBar);
    yield takeEvery(deps.types.ROUTER_DID_CHANGE, colorStatusBar);
  }
}
