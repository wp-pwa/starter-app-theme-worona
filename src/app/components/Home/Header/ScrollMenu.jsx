/* eslint-disable react/no-danger */
import React from 'react';
import { connect } from 'react-redux';
import { flow } from 'lodash/fp';
import { translate } from 'react-i18next';
import CatItem from './CatItem';
import * as deps from '../../../deps';
import styles from './style.css';

class ScrollMenu extends React.Component {
  componentWillMount() {
    this.props.requestAllCategories();
  }

  render() {
    let scrollMenu = null;
    const {
      categories,
      result,
      isReady,
      chosenColor,
      displayCategories,
      currentCategory,
      t,
    } = this.props;
    if (typeof displayCategories !== 'undefined' && displayCategories) {
      scrollMenu = (
        <div className={styles.scrollMenu} style={{ backgroundColor: chosenColor }}>
          {isReady
            ? <div>
                <CatItem key={0} active={!currentCategory} chosenColor={chosenColor} url={''}>
                  {t('Home')}
                </CatItem>
                {result.map(id => (
                  <CatItem
                    key={id}
                    active={currentCategory === id}
                    chosenColor={chosenColor}
                    url={`?cat=${id}`}
                  >
                    <div dangerouslySetInnerHTML={{ __html: categories[id].name }} />
                  </CatItem>
                ))}
              </div>
            : <span className={styles.catItem} style={{ color: chosenColor }}>
                {'\u00A0'}
              </span>}
        </div>
      );
    }
    return scrollMenu;
  }
}

ScrollMenu.propTypes = {
  categories: React.PropTypes.shape({}),
  result: React.PropTypes.arrayOf(React.PropTypes.number),
  isReady: React.PropTypes.bool,
  chosenColor: React.PropTypes.string,
  displayCategories: React.PropTypes.bool,
  requestAllCategories: React.PropTypes.func,
  currentCategory: React.PropTypes.number,
  t: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isReady: deps.selectorCreators.isListReady('allCategories')(state),
  categories: deps.selectors.getCategoriesEntities(state),
  result: deps.selectorCreators.getListResults('allCategories')(state),
  chosenColor: deps.selectorCreators.getSetting('theme', 'chosenColor')(state),
  displayCategories: deps.selectorCreators.getSetting('theme', 'displayCategories')(state),
  currentCategory: parseInt(deps.selectors.getURLQueries(state).cat, 10),
});

const mapDispatchToProps = dispatch => ({
  requestAllCategories: () =>
    dispatch(
      deps.actions.newCategoriesListRequested({ name: 'allCategories', params: { per_page: 99 } })
    ),
});

export default flow(connect(mapStateToProps, mapDispatchToProps), translate('theme'))(ScrollMenu);
