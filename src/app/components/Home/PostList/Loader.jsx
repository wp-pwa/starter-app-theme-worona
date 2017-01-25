import React from 'react';

const Loader = () => (
  <div className="container">
    <div className="columns">
      <div className="column is-4 is-offset-4">
        <div className="notification" style={{ backgroundColor: 'transparent' }}>
          <div className="level is-mobile">
            <div className="level-left">
              Loading posts
            </div>
            <div className="level-right is-marginless">
              <span
                className="button is-loading is-warning"
                style={{ border: 'transparent', backgroundColor: 'transparent' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default Loader;
