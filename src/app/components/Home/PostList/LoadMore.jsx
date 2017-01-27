import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { flow } from 'lodash/fp';
import * as deps from '../../../deps';

const LoadMore = ({ t, requestAnotherPage, retrieved, total }) =>
  total > retrieved ?
    <button className="button is-outlined is-large" onClick={requestAnotherPage}>
      {t('LoadMore')}
    </button> : <div>{t('NoMorePosts')}</div>;

LoadMore.propTypes = {
  t: React.PropTypes.func.isRequired,
  requestAnotherPage: React.PropTypes.func,
  retrieved: React.PropTypes.number,
  total: React.PropTypes.number,
};

const mapStateToProps = state => ({
  retrieved: deps.selectorCreators.getNumberOfRetrievedPages('currentList')(state),
  total: deps.selectorCreators.getNumberOfTotalPages('currentList')(state),
});

const mapDispatchToProps = dispatch => ({
  requestAnotherPage: () => dispatch(deps.actions.anotherPostsPageRequested()),
});

export default flow(connect(mapStateToProps, mapDispatchToProps), translate('theme'))(LoadMore);
