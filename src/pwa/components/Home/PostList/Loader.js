import React from 'react';
import { translate } from 'react-i18next';

const Loader = ({ t }) => (
  <div className="container">
    <div className="columns">
      <div className="column is-4 is-offset-4">
        <div className="notification" style={{ backgroundColor: 'transparent' }}>
          <div className="level is-mobile">
            <div className="level-left">
              {t('LoadingPosts')}
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
Loader.propTypes = { t: React.PropTypes.func.isRequired };

export default translate('theme')(Loader);
