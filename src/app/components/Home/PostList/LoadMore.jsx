import React from 'react';
import { translate } from 'react-i18next';

const LoadMore = ({ t }) => (
  <a className="button is-outlined is-large">
    {t('LoadMore')}
  </a>
);


LoadMore.propTypes = {
  t: React.PropTypes.func.isRequired,
};

export default translate('theme')(LoadMore);
