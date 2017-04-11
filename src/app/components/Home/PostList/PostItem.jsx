/* eslint-disable react/no-danger, no-restricted-syntax, no-undef */
import React from 'react';
import formatDate from 'format-date';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { translate } from 'react-i18next';
import { flow } from 'lodash/fp';
import cn from 'classnames';
import * as deps from '../../../deps';
import * as libs from '../../../libs';
import styles from './style.css';

class CardImage extends React.Component {
  constructor(props) {
    super(props);
    if (
      typeof this.props.featuredMedia !== 'undefined' &&
      typeof this.props.featuredMedia.source_url !== 'undefined'
    ) {
      this.state = { sourceUrl: this.props.featuredMedia.source_url };
    } else {
      this.state = { sourceUrl: 'undefined' };
    }
  }

  componentWillMount() {
    if (
      typeof this.props.featuredMedia !== 'undefined' &&
      typeof this.props.featuredMedia.media_details.sizes !== 'undefined'
    ) {
      // We turn the Object into an array sorted by width.
      let responsiveImages = Object.values(this.props.featuredMedia.media_details.sizes);
      responsiveImages = responsiveImages.sort((a, b) => a.width - b.width);

      // we take the first image that is bigger than the Window Width.
      for (const i in responsiveImages) {
        if (responsiveImages[i].width > window.innerWidth) {
          this.setState({ sourceUrl: responsiveImages[i].source_url });
          break;
        }
      }
    }
  }

  render() {
    return typeof this.props.featuredMedia !== 'undefined' &&
      typeof this.props.featuredMedia.source_url !== 'undefined' &&
      typeof this.state.sourceUrl !== 'undefined'
      ? <Link to={`?p=${this.props.postId}`}>
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={this.state.sourceUrl} alt={this.props.featuredMedia.alt_text} />
            </figure>
          </div>
        </Link>
      : null;
  }
}
CardImage.propTypes = {
  featuredMedia: React.PropTypes.shape({
    source_url: React.PropTypes.string,
    alt_text: React.PropTypes.string,
    media_details: React.PropTypes.object,
  }),
  postId: React.PropTypes.number.isRequired,
};

let CardContent = (
  { title, date, author, categories, chosenColor, postId, displayCategories, t },
) => (
  <div className="card-content">
    <div className="media">
      <div className="media-content">
        <Link to={`?p=${postId}`}>
          <p className="title is-4" dangerouslySetInnerHTML={{ __html: title }} />
          <p className={cn(styles.paddingTop10, 'subtitle is-6')}>
            {author &&
              <span>{t('By')}{' '}<span style={{ fontWeight: 500 }}>{author.name}</span></span>}
          </p>
        </Link>
        {displayCategories &&
          <span className="subtitle is-6 is-pulled-left is-marginless">
            {categories.map(category => (
              <span key={category.id}>
                <Link style={{ color: libs.darkenColor(chosenColor) }} to={`?cat=${category.id}`}>
                  #{category.name}
                </Link>
                {' '}
              </span>
            ))}
          </span>}
        <span className="subtitle is-6 is-pulled-right is-marginless">
          <small>{formatDate('{day}/{month}/{year}', new Date(date))}</small>
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
  postId: React.PropTypes.number,
  displayCategories: React.PropTypes.bool,
  t: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  chosenColor: deps.selectorCreators.getSetting('theme', 'chosenColor')(state),
  displayCategories: deps.selectorCreators.getSetting('theme', 'displayCategories')(state),
});

CardContent = flow(connect(mapStateToProps), translate('theme'))(CardContent);

const PostItem = ({ post, author, featuredMedia, categories, displayFeaturedImage }) => (
  <div className="card is-fullwidth">
    {displayFeaturedImage && <CardImage featuredMedia={featuredMedia} postId={post.id} />}
    <CardContent
      postId={post.id}
      title={post.title.rendered}
      author={author}
      categories={categories}
      date={post.date}
    />
  </div>
);

PostItem.propTypes = {
  post: React.PropTypes.shape({ href: React.PropTypes.string }),
  author: React.PropTypes.shape({}),
  featuredMedia: React.PropTypes.shape({}),
  categories: React.PropTypes.arrayOf(React.PropTypes.object),
  displayFeaturedImage: React.PropTypes.bool,
};

export default PostItem;
