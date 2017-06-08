/* eslint-disable react/no-danger */
import React, { PropTypes } from 'react';
import CaptureLinks from '../../Post/CaptureLinks';
import styles from './style.css';

const ListHeader = ({ contentType, contentId, users, categories, tags }) => {
  if (contentType === 'Category' && categories[contentId]) return (
    <h1
      className={styles.listHeader}
      dangerouslySetInnerHTML={{ __html: categories[contentId].name }}
    />
  );

  if (contentType === 'Tag' && tags[contentId]) return (
    <h1
      className={styles.listHeader}
      dangerouslySetInnerHTML={{ __html: tags[contentId].name }}
    />
  );

  if (contentType === 'Author' && users[contentId]) {
    const { name, description, avatar_urls } = users[contentId];

    return (
      <div className={styles.authorBio}>
        <img
          className={styles.authorAvatar}
          alt="Author's avatar"
          src={avatar_urls[96]}
        />
        <h1 className={styles.authorName}>
          {name}
        </h1>
        <CaptureLinks>
          <p
            className={styles.authorDescription}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </CaptureLinks>
      </div>
    );
  }

  return null;
};

ListHeader.propTypes = {
  contentType: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
  users: PropTypes.shape({}).isRequired,
  categories: PropTypes.shape({}).isRequired,
  tags: PropTypes.shape({}).isRequired,
};

export default ListHeader;
