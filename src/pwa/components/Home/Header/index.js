import React from 'react';
// import ScrollMenu from './ScrollMenu.jsx';
// import TopNav from './TopNav';
import styled from 'styled-components';
// import styles from './style.css';

const MenuWrapper = styled.div`
  .menuWrapper {
    top: 0;
    width: 100%;
  }
`;

const Header = () => <MenuWrapper>hola from starter</MenuWrapper>;

// <TopNav />
// <ScrollMenu />

Header.propTypes = {};

export default Header;
