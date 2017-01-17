import React from 'react';
import { connect } from 'react-redux';
import CatItem from './CatItem';
import * as deps from '../../../deps'; // eslint-disable-line
import styles from './style.css';

const ScrollMenu = ({ categories, result, isReady }) => (
  <div className={styles.scrollMenu}>
    {isReady && result.map(id => (
      <CatItem key={id} active={false} href={categories[id].link}>
        {categories[id].name}
      </CatItem>
    ))}
  </div>
);

ScrollMenu.propTypes = {
  categories: React.PropTypes.shape({}),
  result: React.PropTypes.arrayOf(React.PropTypes.number),
  isReady: React.PropTypes.bool,
  // displayCategories: React.PorpTypes.bool,
};

const mapStateToProps = state => ({ // eslint-disable-line
  isReady: deps.selectors.isCategoriesReady(state),
  categories: deps.selectors.getCategoriesById(state),
  result: deps.selectors.getCategoriesResult(state),
  // displayCategories: deps.selectorCreators.getSetting('theme', 'displayCategories')(state),
});

export default connect(mapStateToProps)(ScrollMenu);
