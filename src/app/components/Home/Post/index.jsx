import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as deps from '../../../deps'; // eslint-disable-line
import styles from './style.css';

const NavBar = () => (
  <div className={styles.menuPost}>
    <nav className="level is-mobile">
      <div className="level-left">
        <div className="level-item">
          <Link to="/home" className="icon">
            <i className="fa fa-arrow-left" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="level-right is-marginless">
        <div className="level-item">
          <span className="icon">
            <i className="fa fa-share-alt" aria-hidden="true" />
          </span>
        </div>
      </div>
    </nav>
  </div>
);

let Title = ({ post, categories, authors, chosenColor }) => (
  <div className="content is-medium">
    <h1>{post.title.rendered}</h1>
    <h6>
      By <span style={{ fontWeight: 600 }}>{authors[post.author].name} </span>
      in { post.categories.map((category) => (
        <span key={category}>
          <Link style={{ color: chosenColor }} to={categories[category].link}>#{categories[category].name}</Link>{' '}
        </span>
      ))}
    </h6>
  </div>
);

Title.propTypes = {
  post: React.PropTypes.shape({}),
  categories: React.PropTypes.shape({}),
  authors: React.PropTypes.shape({}),
  chosenColor: React.PropTypes.string,
};

const mapStateToTitleProps = state => ({ // eslint-disable-line
  authors: deps.selectors.getAuthorsById(state),
  categories: deps.selectors.getCategoriesById(state),
  chosenColor: deps.selectorCreators.getSetting('theme', 'chosenColor')(state),
});

Title = connect(mapStateToTitleProps)(Title);

const Post = ({ id, posts, isReady }) => (
  <div>
    <NavBar />
    { isReady && (
      <section className="section">
        <Title post={posts[id]} />
        <div
          style={{ overflow: 'hidden' }} className="content is-medium"
          dangerouslySetInnerHTML={{ __html: posts[id].content.rendered }} />
      </section>
    )}
  </div>
);

Post.propTypes = {
  id: React.PropTypes.number,
  isReady: React.PropTypes.bool,
  posts: React.PropTypes.shape({}),
};

const mapStateToProps = state => ({ // eslint-disable-line
  posts: deps.selectors.getPostsById(state),
  result: deps.selectors.getPostsResult(state),
  isReady: deps.selectors.isPostsReady(state),
  authors: deps.selectors.getAuthorsById(state),
  categories: deps.selectors.getCategoriesById(state),
  chosenColor: deps.selectorCreators.getSetting('theme', 'chosenColor')(state),
});

export default connect(mapStateToProps)(Post);
