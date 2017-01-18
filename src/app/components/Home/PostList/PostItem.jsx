import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import styles from './style.css';

const CardImage = ({ featuredMedia }) => {
  let Card = null;
  const display = (typeof featuredMedia !== 'undefined');

  if (display) {
    Card = (<div className="card-image">
      <figure className="image is-4by3">
        <img src={featuredMedia.source_url} alt={featuredMedia} />
      </figure>
    </div>);
  }

  return Card;
};

CardImage.propTypes = {
  featuredMedia: React.PropTypes.shape({
    source_url: React.PropTypes.string,
    alt_text: React.PropTypes.string,
  }),
};

const CardContent = ({ title, date, author, categories }) => (
  <div className="card-content">
    <div className="media">
      <div className="media-content">
        <p className="title is-4">{ title }</p>
        <p className={cn(styles.paddingTop10, 'subtitle is-6')} >
          by {author.name} in { categories.map((category, index) => (
            <span key={category.id}>
              <Link to={category.link}>#{category.name}</Link>{index < categories.length - 1 && ', '}
            </span>
            ))}
        </p>
        <p className="subtitle is-6">
          <small>{date}</small>
        </p>
      </div>
    </div>
  </div>
);

CardContent.propTypes = {
  title: React.PropTypes.string,
  date: React.PropTypes.string,
  author: React.PropTypes.shape({}),
  categories: React.PropTypes.arrayOf(React.PropTypes.object),
};

const PostItem = ({ post, author, featuredMedia, categories, displayFeaturedImage }) => (
  <Link to={post.link}>
    <div className="card is-fullwidth">
      {displayFeaturedImage && <CardImage featuredMedia={featuredMedia} />}
      <CardContent
        title={post.title.rendered}
        author={author}
        categories={categories}
        date={post.date}
      />
    </div>
  </Link>
);

PostItem.propTypes = {
  post: React.PropTypes.shape({
    href: React.PropTypes.string,
  }),
  author: React.PropTypes.shape({}),
  featuredMedia: React.PropTypes.shape({}),
  categories: React.PropTypes.arrayOf(React.PropTypes.object),
  displayFeaturedImage: React.PropTypes.bool,
};

export default PostItem;
