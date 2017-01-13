import React from 'react';
import { Link } from 'react-router';

const CardImage = ({ img }) => (
  <div className="card-image">
    img
  </div>
);

CardImage.propTypes = {
  img: React.PropTypes.shape({
    src: React.PropTypes.string,
    alt: React.PropTypes.string,
  }),
};

const CardContent = ({ title, date, author, categories }) => (
  <div className="card-content">
    <div className="media">
      <div className="media-content">
        <p className="title is-4">{ title }</p>
        <p className="subtitle is-6">
          by {author} in { categories.map(cat => (
            <Link to={cat.href}>#{cat.name}</Link>
          ))}
        </p>
      </div>
    </div>
    <div className="content">
      <p className="subtitle is-6">
        <small>{date}</small>
      </p>
    </div>
  </div>
);

CardContent.propTypes = {
  title: React.PropTypes.string,
  date: React.PropTypes.string,
  author: React.PropTypes.string,
  categories: React.PropTypes.arrayOf(React.PropTypes.object),
};

const PostItem = ({ post }) => (
  <Link to={post.href}>
    <div className="card is-fullwidth">
      <CardImage src={post.img} />
      <CardContent title={post.title} author={post.author} categories={post.categories} />
    </div>
  </Link>
);

PostItem.propTypes = {
  post: React.PropTypes.shape({
    href: React.PropTypes.string,
  }),
};

export default PostItem;
