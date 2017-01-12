import React from 'react';
import cn from 'classnames';
import styles from './style.css';

const CatItem = ({ children, href, active }) => {
  const classCatItem = cn(styles.catItem, active && styles.active);
  return (
    <a className={classCatItem} href={href}>
      {children}
    </a>
  );
};

CatItem.propTypes = {
  children: React.PropTypes.node.isRequired,
  href: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool,
};

export default CatItem;
