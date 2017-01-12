import React from 'react';
import { connect } from 'react-redux';
import CatItem from './CatItem';
import * as deps from '../../../deps'; // eslint-disable-line
import styles from './style.css';

const ScrollMenu = ({ categories }) => (
  <div className={styles.scrollMenu}>
    {categories.map(category => (
      <CatItem active={category.active} href={category.href}>{category.name}</CatItem>
    ))}
  </div>
);

ScrollMenu.propTypes = {
  categories: React.PropTypes.arrayOf(React.PropTypes.object),
};

const mapStateToProps = state => ({ // eslint-disable-line
  // categories: deps.selectorCreators.getSetting('connection', 'categories')(state),
  categories: [{ href: '#', name: 'cat1', active: true }, { href: '#', name: 'cat1', active: false }, { href: '#', name: 'cat1', active: false }, { href: '#', name: 'cat1', active: false }, { href: '#', name: 'cat1', active: false }, { href: '#', name: 'cat1', active: false }, { href: '#', name: 'cat1', active: false }, { href: '#', name: 'cat1', active: false }, { href: '#', name: 'cat1', active: false }],
});

export default connect(mapStateToProps)(ScrollMenu);
