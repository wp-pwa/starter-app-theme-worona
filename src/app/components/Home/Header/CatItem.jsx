import React from 'react';
import * as libs from '../../../libs';
import * as deps from '../../../deps';
import styles from './style.css';

const CatItem = ({ children, url, active, chosenColor }) => (
  <deps.components.Link
    style={{
      color: libs.blackOrWhite(chosenColor),
      boxShadow: active ? `inset 0 -5px 0 0 ${libs.blackOrWhite(chosenColor)}` : '',
    }}
    className={styles.catItem}
    to={url}
  >
    {children}
  </deps.components.Link>
);

CatItem.propTypes = {
  children: React.PropTypes.node,
  url: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool,
  chosenColor: React.PropTypes.string,
};

export default CatItem;
