import React from 'react';
import Color from 'color';
import { connect } from 'react-redux';
import * as deps from '../../../deps';
import * as libs from '../../../libs';
import styles from './style.css';

const TopNav = ({ title, chosenColor }) => (
  <div
    className={styles.headMenu}
    style={{ backgroundColor: chosenColor, color: libs.blackOrWhite(chosenColor) }}
  >
    {title}
  </div>
);

TopNav.propTypes = { title: React.PropTypes.string, chosenColor: React.PropTypes.string };

const mapStateToProps = state => ({
  // eslint-disable-line
  title: deps.selectorCreators.getSetting('generalApp', 'title')(state),
  chosenColor: deps.selectorCreators.getSetting('theme', 'chosenColor')(state),
});

export default connect(mapStateToProps)(TopNav);
