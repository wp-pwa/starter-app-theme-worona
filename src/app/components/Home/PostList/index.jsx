import React from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import LoadMore from './LoadMore';
import * as deps from '../../../deps'; // eslint-disable-line
import styles from './style.css';

const PostList = ({ posts }) => (
  <div className={styles.postList}>
    <div className="columns is-multiline">
      { posts.map(post => (
        <div className="column is-one-quarter">
          <PostItem post={post} />
        </div>
      ))}
      <LoadMore />
    </div>
  </div>
);

PostList.propTypes = {
  posts: React.PropTypes.arrayOf(React.PropTypes.object),
};

const mapStateToProps = state => ({ // eslint-disable-line
  // posts: deps.selectorCreators.getSetting('connection', 'posts')(state),
  posts: [{ href: '#', title: 'cat1', image: true }, { href: '#', name: 'cat1', active: false }, { href: '#', name: 'cat1', active: false }, { href: '#', name: 'cat1', active: false }, { href: '#', name: 'cat1', active: false }, { href: '#', name: 'cat1', active: false }, { href: '#', name: 'cat1', active: false }, { href: '#', name: 'cat1', active: false }, { href: '#', name: 'cat1', active: false }],
});

export default connect(mapStateToProps)(PostList);
