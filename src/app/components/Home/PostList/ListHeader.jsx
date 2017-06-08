import React, { PropTypes } from 'react';
// import AuthorBio from './AuthorBio';
import styles from './style.css';

const ListHeader = ({ contentType, contentId, users, categories, tags }) => {
  if (contentType === 'Category' && categories[contentId]) return (
    <h1 className={styles.listHeader}>
      {`${contentType}: ${categories[contentId].name}`}
    </h1>
  );

  if (contentType === 'Tag' && tags[contentId]) return (
    <h1 className={styles.listHeader}>
      {`${contentType}: ${tags[contentId].name}`}
    </h1>
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
        <p className={styles.authorDescription}>
          {description}
        </p>
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
