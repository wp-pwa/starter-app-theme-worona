import React from 'react';
import cn from 'classnames';
import styles from './style.css';

const Loader = () => (
  <section className="hero is-fullheight">
    <div className="hero-body">
      <div className="container">
        <p className="has-text-centered">
          <a className={cn('button is-loading is-large', styles.borderLess)}>Loading</a>
        </p>
        <h3 className="has-text-centered">
          Loading posts...
        </h3>
      </div>
    </div>
  </section>
);


export default Loader;
