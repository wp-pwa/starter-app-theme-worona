import React from 'react';
import { connect } from 'react-redux';
import CatItem from './CatItem';
import * as deps from '../../../deps'; // eslint-disable-line
import styles from './style.css';

const ScrollMenu = ({ categories, result, isReady, chosenColor, displayCategories }) => {
  let scrollMenu = null;

  if ((typeof displayCategories !== 'undefined') && displayCategories) {
    scrollMenu = (<div className={styles.scrollMenu} style={{ backgroundColor: `${chosenColor}` }}>
      {isReady && result.map(id => (
        <CatItem key={id} active={false} href={categories[id].link}>
          {categories[id].name}
        </CatItem>
      ))}
    </div>);
  }

  return scrollMenu;
};

ScrollMenu.propTypes = {
  categories: React.PropTypes.shape({}),
  result: React.PropTypes.arrayOf(React.PropTypes.number),
  isReady: React.PropTypes.bool,
  chosenColor: React.PropTypes.string,
  displayCategories: React.PropTypes.bool,
};

const mapStateToProps = state => ({ // eslint-disable-line
  isReady: deps.selectors.isCategoriesReady(state),
  categories: deps.selectors.getCategoriesById(state),
  result: deps.selectors.getCategoriesResult(state),
  chosenColor: deps.selectorCreators.getSetting('theme', 'chosenColor')(state),
  displayCategories: deps.selectorCreators.getSetting('theme', 'displayCategories')(state),
});

export default connect(mapStateToProps)(ScrollMenu);
