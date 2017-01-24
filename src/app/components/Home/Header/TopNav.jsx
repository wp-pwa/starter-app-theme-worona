import React from 'react';
import fontColorContrast from 'font-color-contrast';
import { connect } from 'react-redux';
import * as deps from '../../../deps'; // eslint-disable-line
import styles from './style.css';

const TopNav = ({ title, chosenColor }) => {
  const contrastColor = fontColorContrast(chosenColor);

  return (
    <div className={styles.headMenu} style={{ backgroundColor: `${chosenColor}`, color: contrastColor }}>
      {title}
    </div>);
};

TopNav.propTypes = {
  title: React.PropTypes.string,
  chosenColor: React.PropTypes.string,
};

const mapStateToProps = state => ({ // eslint-disable-line
  title: deps.selectorCreators.getSetting('generalApp', 'title')(state),
  chosenColor: deps.selectorCreators.getSetting('theme', 'chosenColor')(state),
});

export default connect(mapStateToProps)(TopNav);
