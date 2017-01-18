import React from 'react';
import fontColorContrast from 'font-color-contrast';
import cn from 'classnames';
import styles from './style.css';

const CatItem = ({ children, href, active, chosenColor }) => {
  const classCatItem = cn(styles.catItem, active && styles.active);
  const contrastColor = fontColorContrast(chosenColor);

  return (
    <a style={{ color: contrastColor }} className={classCatItem} href={href}>
      {children}
    </a>
  );
};

CatItem.propTypes = {
  children: React.PropTypes.node,
  href: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool,
  chosenColor: React.PropTypes.string,
};

export default CatItem;
