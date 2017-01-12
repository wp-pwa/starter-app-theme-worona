import React from 'react';
import ScrollMenu from './ScrollMenu.jsx';
import TopNav from './TopNav';
import styles from './style.css';

const Header = () => (
  <div className={styles.menuWrapper}>
    <TopNav />
    <ScrollMenu />
  </div>
);


Header.propTypes = {
  catName: React.PropTypes.string.isRequired,
  href: React.PropTypes.string.isRequired,
};

export default Header;
