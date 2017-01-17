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
};

export default Header;
