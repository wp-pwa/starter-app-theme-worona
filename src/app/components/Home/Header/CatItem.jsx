import React from 'react';
import fontColorContrast from 'font-color-contrast';
import { Link } from 'react-router';
import cn from 'classnames';
import styles from './style.css';

const CatItem = ({ children, id, active, chosenColor }) => {
  const classCatItem = cn(styles.catItem, active && styles.active);
  const contrastColor = fontColorContrast(chosenColor);

  return (
    <Link style={{ color: contrastColor }} className={classCatItem} to={`?cat=${id}`}>
      {children}
    </Link>
  );
};

CatItem.propTypes = {
  children: React.PropTypes.node,
  id: React.PropTypes.number.isRequired,
  active: React.PropTypes.bool,
  chosenColor: React.PropTypes.string,
};

export default CatItem;
