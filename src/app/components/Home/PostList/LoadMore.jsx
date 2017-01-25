import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { flow } from 'lodash/fp';
import * as deps from '../../../deps'; // eslint-disable-line

let LoadMore = ({ t, anotherPostsPageRequested }) => (
  <button className="button is-outlined is-large" onClick={anotherPostsPageRequested()}>
    {t('LoadMore')}
  </button>
);


LoadMore.propTypes = {
  t: React.PropTypes.func.isRequired,
  anotherPostsPageRequested: React.PropTypes.func,
};

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
  anotherPostsPageRequested: () => dispatch(deps.actions.anotherPostsPageRequested()),
});

LoadMore = flow(
  connect(mapDispatchToProps),
  translate('theme')
)(LoadMore);

export default LoadMore;
