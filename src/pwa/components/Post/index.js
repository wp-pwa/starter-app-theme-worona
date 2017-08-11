/* eslint-disable react/no-danger */
import React from 'react';
import { connect } from 'react-redux';
// import * as deps from '../../deps';
// import NavBar from './NavBar';
// import Title from './Title';
// import ContentHtml from './ContentHtml';

const Post = ({ post, chosenColor, isReady }) => (
  <div>
    hola from post
  </div>
);

Post.propTypes = {
  isReady: React.PropTypes.bool,
  post: React.PropTypes.shape({
    content: React.PropTypes.shape({ rendered: React.PropTypes.string }),
  }),
  chosenColor: React.PropTypes.string,
};

// const mapStateToProps = state => ({
//   post: deps.selectors.getCurrentSingle(state),
//   isReady: deps.selectors.isCurrentSingleReady(state),
//   chosenColor: deps.selectorCreators.getSetting('theme', 'chosenColor')(state),
//   siteUrl: deps.selectorCreators.getSetting('generalSite', 'url')(state),
// });
//
// export default connect(mapStateToProps)(Post);

export default Post;
