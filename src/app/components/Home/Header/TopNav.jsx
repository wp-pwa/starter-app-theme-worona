import React from 'react';
import { isIos } from 'worona-deps';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as deps from '../../../deps';
import * as libs from '../../../libs';
import styles from './style.css';

const TopNav = ({ title, chosenColor, ios }) => (
  <div
    className={cn(styles.headMenu, ios && styles.headMenuIos)}
    style={{ backgroundColor: chosenColor, color: libs.blackOrWhite(chosenColor) }}
  >
    {title}
  </div>
);

TopNav.propTypes = {
  title: React.PropTypes.string,
  chosenColor: React.PropTypes.string,
  ios: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  // eslint-disable-line
  title: deps.selectorCreators.getSetting('generalApp', 'title')(state),
  chosenColor: deps.selectorCreators.getSetting('theme', 'chosenColor')(state),
  ios: isIos,
});

export default connect(mapStateToProps)(TopNav);
