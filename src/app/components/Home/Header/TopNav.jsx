import React from 'react';
import { connect } from 'react-redux';
import * as deps from '../../../deps'; // eslint-disable-line
import styles from './style.css';

const TopNav = ({ title }) => (
  <div className={styles.headMenu}>
    <strong className={styles.whiteText}>{title}</strong>
  </div>
);

TopNav.propTypes = {
  title: React.PropTypes.string,
};

const mapStateToProps = state => ({ // eslint-disable-line
  // title: deps.selectorCreators.getSetting('generalApp', 'title')(state),
  title: 'Title',
});

export default connect(mapStateToProps)(TopNav);
