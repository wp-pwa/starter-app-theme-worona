import React from 'react';
import formatDate from 'format-date';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cn from 'classnames';
import * as deps from '../../../deps'; // eslint-disable-line
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

let CardContent = ({ title, date, author, categories, chosenColor }) => (
  <div className="card-content">
    <div className="media">
      <div className="media-content">
        <p className="title is-4">{ title }</p>
        <p className={cn(styles.paddingTop10, 'subtitle is-6')} >
          by <span style={{ fontWeight: 500 }}>{author.name}</span>
        </p>
        <span className="subtitle is-6 is-pulled-left is-marginless">
          { categories.map((category, index) => (
            <span key={category.id}>
              <Link style={{ color: chosenColor }} to={category.link}>#{category.name}</Link>{' '}
            </span>
            ))}
        </span>
        <span className="subtitle is-6 is-pulled-right is-marginless">
          <small>{ formatDate('{day}/{month}/{year}', new Date(date)) }</small>
        </span>
      </div>
    </div>
  </div>
);

CardContent.propTypes = {
  title: React.PropTypes.string,
  date: React.PropTypes.string,
  author: React.PropTypes.shape({}),
  categories: React.PropTypes.arrayOf(React.PropTypes.object),
  chosenColor: React.PropTypes.string,
};

const mapStateToProps = state => ({ // eslint-disable-line
  chosenColor: deps.selectorCreators.getSetting('theme', 'chosenColor')(state),
});

CardContent = connect(mapStateToProps)(CardContent);


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
