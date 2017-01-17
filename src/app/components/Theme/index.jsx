import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as deps from '../../deps';

const Theme = (
  {
    theme,
    generalApp,
    postsResult,
    posts,
    isPostsReady,
    categoriesResult,
    isCategoriesReady,
    categories,
  },
) => (
  <div>
    <div>title: {generalApp.title}</div>
    <div>numberOfPosts: {generalApp.numberOfPosts}</div>
    <div>chosenColor: {theme.chosenColor}</div>
    <div>displayFeaturedImage: {theme.displayFeaturedImage ? 'yes' : 'no'}</div>
    <div>displayCategories: {theme.displayCategories ? 'yes' : 'no'}</div>
    <ul>
      {isCategoriesReady && categoriesResult.map(
            id => (
              <li key={id}>
                <Link to={categories[id].link}>
                  {categories[id].name}
                </Link>
              </li>
            ),
          )}
      {!isCategoriesReady && <div>Loding categories...</div>}
    </ul>
    <ul>
      {isPostsReady && postsResult.map(
            id => (
              <li key={id}>
                <Link to={posts[id].link}>
                  {posts[id].title.rendered}
                </Link>
              </li>
            ),
          )}
      {!isPostsReady && <div>Loding posts...</div>}
    </ul>
  </div>
);

Theme.propTypes = {
  generalApp: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    numberOfPosts: React.PropTypes.string.isRequired,
  }).isRequired,
  theme: React.PropTypes.shape({
    chosenColor: React.PropTypes.string.isRequired,
    displayFeaturedImage: React.PropTypes.bool.isRequired,
    displayCategories: React.PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = state =>
  ({
    generalApp: deps.selectorCreators.getSettings('generalApp')(state),
    theme: deps.selectorCreators.getSettings('theme')(state),
    isPostsReady: deps.selectors.isPostsReady(state),
    posts: deps.selectors.getPostsById(state),
    postsResult: deps.selectors.getPostsResult(state),
    isCategoriesReady: deps.selectors.isCategoriesReady(state),
    categories: deps.selectors.getCategoriesById(state),
    categoriesResult: deps.selectors.getCategoriesResult(state),
  });
// posts: deps.selectors.getPostsById(state),
// postsResult: deps.selectors.getPostsResult(state),
export default connect(mapStateToProps)(Theme)
