/* eslint-disable react/no-danger */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { translate } from 'react-i18next';
import { flow } from 'lodash/fp';
import cheerio from 'cheerio';
import * as deps from '../../deps';
import * as libs from '../../libs';
import styles from './style.css';

let NavBar = ({ goBack }) => (
  <div className={styles.menuPost}>
    <nav className="level is-mobile">
      <div className="level-left">
        <div className="level-item">
          <button
            onClick={goBack}
            className="icon is-medium"
            style={{ color: '#363636', background: 'transparent', border: 'transparent' }}
          >
            <i className="fa fa-arrow-left" aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  </div>
);

NavBar.propTypes = { goBack: React.PropTypes.func };

const MapNavBarStatetoProps = state => ({ historyLength: deps.selectors.getHistoryLength(state) });

const mergeProps = ({ historyLength }) => ({
  goBack() {
    if (historyLength > 1) deps.libs.goBack();
    else deps.libs.push('?');
  },
});

NavBar = connect(MapNavBarStatetoProps, null, mergeProps)(NavBar);

let Title = ({ post, categories, users, chosenColor, displayCategories, t }) => (
  <div className="content is-medium">
    <h1><div dangerouslySetInnerHTML={{ __html: post.title.rendered }} /></h1>
    <h6>
      {`${t('By')} `}<span style={{ fontWeight: 600 }}>{users[post.author].name} </span>
      {
        displayCategories && post.categories.map(category => (
            <span key={category}>
              <Link
                style={{ color: libs.darkenColor(chosenColor) }}
                to={`?cat=${categories[category].id}`}
              >
                #{categories[category].name}
              </Link>
              {' '}
            </span>
          ))
      }
    </h6>
  </div>
);

Title.propTypes = {
  post: React.PropTypes.shape({}),
  categories: React.PropTypes.shape({}),
  users: React.PropTypes.shape({}),
  chosenColor: React.PropTypes.string,
  displayCategories: React.PropTypes.bool,
  t: React.PropTypes.func.isRequired,
};

const mapStateToTitleProps = state => ({
  users: deps.selectors.getUsersEntities(state),
  categories: deps.selectors.getCategoriesEntities(state),
  chosenColor: deps.selectorCreators.getSetting('theme', 'chosenColor')(state),
  displayCategories: deps.selectorCreators.getSetting('theme', 'displayCategories')(state),
});

Title = flow(connect(mapStateToTitleProps), translate('theme'))(Title);

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { html: '' };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      const $ = cheerio.load(nextProps.post.content.rendered);
      $('a').attr('style', `color: ${libs.darkenColor(nextProps.chosenColor)};`);
      this.setState({ html: $.html() });
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        {
          this.props.isReady && (
              <section className="section" style={{ paddingTop: '1rem' }}>
                <Title post={this.props.post} />
                <div
                  style={{ overflow: 'hidden' }}
                  className="content is-medium"
                  dangerouslySetInnerHTML={{ __html: this.state.html }}
                />
              </section>
            )
        }
      </div>
    );
  }
}
Post.propTypes = {
  isReady: React.PropTypes.bool,
  post: React.PropTypes.shape({
    content: React.PropTypes.shape({ rendered: React.PropTypes.string }),
  }),
  chosenColor: React.PropTypes.string,
};

const mapStateToProps = state => ({
  post: deps.selectors.getCurrentSingle(state),
  isReady: deps.selectors.isCurrentSingleReady(state),
  chosenColor: deps.selectorCreators.getSetting('theme', 'chosenColor')(state),
});

export default connect(mapStateToProps)(Post);
