import React from 'react';
import { Link } from 'react-router';
import * as libs from '../../../libs';
import styles from './style.css';

const CatItem = ({ children, url, active, chosenColor }) => (
  <Link
    style={{
      color: libs.blackOrWhite(chosenColor),
      boxShadow: active ? `inset 0 -5px 0 0 ${libs.blackOrWhite(chosenColor)}` : '',
    }}
    className={styles.catItem}
    to={url}
  >
    {children}
  </Link>
);

CatItem.propTypes = {
  children: React.PropTypes.node,
  url: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool,
  chosenColor: React.PropTypes.string,
};

export default CatItem;
