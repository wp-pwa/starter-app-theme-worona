/* eslint-disable react/no-danger */
import React from 'react';

const Title = ({ post }) => (
  <div className="content is-medium">
    <h1><div dangerouslySetInnerHTML={{ __html: post.title.rendered }} /></h1>
  </div>
);

Title.propTypes = {
  post: React.PropTypes.shape({}),
};

export default Title;
