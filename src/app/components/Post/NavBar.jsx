import React from 'react';
import { connect } from 'react-redux';
import * as deps from '../../deps';
import styles from './style.css';

const NavBar = ({ goBack }) => (
  <div className={styles.menuPost}>
    <nav className="level is-mobile">
      <div className="level-left">
        <div className="level-item">
          <button
            onClick={goBack}
            className="icon is-medium"
            style={{ color: '#363636', background: 'transparent', border: 'transparent' }}
          >
            <i className="fa fa-arrow-left" aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  </div>
);

NavBar.propTypes = { goBack: React.PropTypes.func };

const mapStateToProps = state => ({ historyLength: deps.selectors.getHistoryLength(state) });

const mergeProps = ({ historyLength }) => ({
  goBack() {
    if (historyLength > 1) deps.libs.goBack();
    else deps.libs.push('?');
  },
});

export default connect(mapStateToProps, null, mergeProps)(NavBar);
