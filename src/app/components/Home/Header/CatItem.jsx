import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import * as libs from '../../../libs';
import styles from './style.css';

const CatItem = ({ children, url, active, chosenColor }) => (
  <Link
    style={{ color: libs.blackOrWhite(chosenColor) }}
    className={cn(styles.catItem, active && styles.active)}
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
