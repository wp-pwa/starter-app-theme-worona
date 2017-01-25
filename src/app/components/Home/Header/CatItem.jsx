import React from 'react';
import fontColorContrast from 'font-color-contrast';
import { Link } from 'react-router';
import cn from 'classnames';
import styles from './style.css';

const CatItem = ({ children, url, active, chosenColor }) => {
  const classCatItem = cn(styles.catItem, active && styles.active);
  const contrastColor = fontColorContrast(chosenColor);

  return (
    <Link style={{ color: contrastColor }} className={classCatItem} to={url}>
      {children}
    </Link>
  );
};

CatItem.propTypes = {
  children: React.PropTypes.node,
  url: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool,
  chosenColor: React.PropTypes.string,
};

export default CatItem;
