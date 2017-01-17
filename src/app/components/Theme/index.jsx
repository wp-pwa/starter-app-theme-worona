import React from 'react';
import { connect } from 'react-redux';
import * as deps from '../../deps';

const Theme = ({ theme, generalApp, postsResult, posts, isReady }) => (
  <div>
    <div>title: {generalApp.title}</div>
    <div>numberOfPosts: {generalApp.numberOfPosts}</div>
    <div>chosenColor: {theme.chosenColor}</div>
    <div>displayFeaturedImage: {theme.displayFeaturedImage ? 'yes' : 'no'}</div>
    <div>displayCategories: {theme.displayCategories ? 'yes' : 'no'}</div>
    <ul>
      {isReady && postsResult.map(id =>
        <li>{posts[id].title.rendered}</li>
      )}
      {!isReady && (<div>Loding...</div>)}
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

const mapStateToProps = (state) => ({
  generalApp: deps.selectorCreators.getSettings('generalApp')(state),
  theme: deps.selectorCreators.getSettings('theme')(state),
  isReady: state.connection && state.connection.posts && state.connection.posts.isReady,
  posts: state.connection && state.connection.posts && state.connection.posts.entities.post,
  postsResult: state.connection && state.connection.posts && state.connection.posts.result,
});

export default connect(mapStateToProps)(Theme);
