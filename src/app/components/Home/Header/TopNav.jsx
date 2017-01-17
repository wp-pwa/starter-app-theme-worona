import React from 'react';
import { connect } from 'react-redux';
import * as deps from '../../../deps'; // eslint-disable-line
import styles from './style.css';

const TopNav = ({ title, chosenColor }) => (
  <div className={styles.headMenu} style={{ backgroundColor: `${chosenColor}`, fontWeight: 400 }}>
    <strong className={styles.whiteText}>{title}</strong>
  </div>
);

TopNav.propTypes = {
  title: React.PropTypes.string,
  chosenColor: React.PropTypes.string,
};

const mapStateToProps = state => ({ // eslint-disable-line
  title: deps.selectorCreators.getSetting('generalApp', 'title')(state),
  chosenColor: deps.selectorCreators.getSetting('theme', 'chosenColor')(state),
});

export default connect(mapStateToProps)(TopNav);
