import React from 'react';
import { setStatic, compose } from 'recompose';
import Theme from './components/Theme';
import reducers from './reducers';

const StarterTheme = () => null;

export default compose(
  setStatic('Theme', Theme),
  setStatic('reducers', reducers),
)(StarterTheme);
