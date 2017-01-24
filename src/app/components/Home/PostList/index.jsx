import React from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import LoadMore from './LoadMore';
import Loader from './Loader';
import * as deps from '../../../deps'; // eslint-disable-line
import styles from './style.css';

const PostList = ({ posts, results, isReady, users, media, displayFeaturedImage,
  categories }) => (
    <div className={styles.postList}>
      <div className="columns is-multiline">
        { isReady ? results.map(id => (
          <div key={id} className="column is-one-quarter">
            <PostItem
              post={posts[id]}
              author={users[posts[id].author]}
              featuredMedia={media[posts[id].featured_media]}
              displayFeaturedImage={displayFeaturedImage}
              categories={posts[id].categories.map(catId => categories[catId])}
            />
          </div>
        )) : (
          <Loader />
        )}
        { isReady && (<div className="column is-one-quarter has-text-centered">
          <LoadMore />
        </div>)}
      </div>
    </div>
);

PostList.propTypes = {
  posts: React.PropTypes.shape({}),
  results: React.PropTypes.arrayOf(React.PropTypes.number),
  isReady: React.PropTypes.bool,
  users: React.PropTypes.shape({}),
  media: React.PropTypes.shape({}),
  categories: React.PropTypes.shape({}),
  displayFeaturedImage: React.PropTypes.bool,
};

const mapStateToProps = state => ({ // eslint-disable-line
  posts: deps.selectors.getPostsEntities(state),
  results: deps.selectorCreators.getListResults('currentList')(state),
  isReady: deps.selectorCreators.isListReady('currentList')(state),
  users: deps.selectors.getUsersEntities(state),
  media: deps.selectors.getMediaEntities(state),
  categories: deps.selectors.getCategoriesEntities(state),
  displayFeaturedImage: deps.selectorCreators.getSetting('theme', 'displayFeaturedImage')(state),
});

export default connect(mapStateToProps)(PostList);
