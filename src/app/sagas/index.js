import { fork } from 'redux-saga/effects';

function* logSaga() {
  console.log('Starter Theme sagas running!');
}

export default function* testSagas() {
  yield [
    fork(logSaga),
  ];
}
