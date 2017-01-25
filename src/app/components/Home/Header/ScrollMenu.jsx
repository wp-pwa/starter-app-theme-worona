import React from 'react';
import { connect } from 'react-redux';
import CatItem from './CatItem';
import * as deps from '../../../deps'; // eslint-disable-line
import styles from './style.css';

class ScrollMenu extends React.Component {
  componentWillMount() {
    this.props.requestAllCategories();
  }

  render() {
    let scrollMenu = null;
    const { categories, result, isReady, chosenColor, displayCategories } = this.props;

    if ((typeof displayCategories !== 'undefined') && displayCategories) {
      scrollMenu = (<div className={styles.scrollMenu} style={{ backgroundColor: chosenColor }}>
        {isReady ? (result.map(id => (
          <CatItem key={id} active={false} chosenColor={chosenColor} href={categories[id].link}>
            {categories[id].name}
          </CatItem>
        ))) :
        (<span className={styles.catItem} style={{ color: chosenColor }}>{'\u00A0'}</span>)
        }
      </div>);
    }
    return (scrollMenu);
  }
}

ScrollMenu.propTypes = {
  categories: React.PropTypes.shape({}),
  result: React.PropTypes.arrayOf(React.PropTypes.number),
  isReady: React.PropTypes.bool,
  chosenColor: React.PropTypes.string,
  displayCategories: React.PropTypes.bool,
  requestAllCategories: React.PropTypes.func,
};

const mapStateToProps = state => ({ // eslint-disable-line
  isReady: deps.selectorCreators.isListReady('allCategories')(state),
  categories: deps.selectors.getCategoriesEntities(state),
  result: deps.selectorCreators.getListResults('allCategories')(state),
  chosenColor: deps.selectorCreators.getSetting('theme', 'chosenColor')(state),
  displayCategories: deps.selectorCreators.getSetting('theme', 'displayCategories')(state),
});

const mapDispatchToProps = dispatch => ({
  requestAllCategories: () => dispatch(deps.actions.newCategoriesListRequested({ name: 'allCategories' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollMenu);
