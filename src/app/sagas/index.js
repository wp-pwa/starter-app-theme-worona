/* eslint-disable no-undef */
import { fork } from 'redux-saga/effects';
import { isIos } from 'worona-deps';

function hideIosStatusBar() {
  if (isIos && StatusBar) {
    StatusBar.hide();
  }
}

export default function* starterProSagas() {
  yield [
    fork(hideIosStatusBar),
  ];
}
