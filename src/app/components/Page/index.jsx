/* eslint-disable react/no-danger */
import React from 'react';
import { connect } from 'react-redux';
import * as deps from '../../deps';
import NavBar from './NavBar';
import Title from './Title';
import ContentHtml from '../../elements/ContentHtml';

const Page = ({ post, color, isReady, rtl = false }) => (
  <div>
    <NavBar />
    {isReady &&
      <section
        className="section"
        style={{ paddingTop: '1rem', direction: rtl ? 'rtl' : 'inherit' }}
      >
        <Title post={post} />
        <ContentHtml html={post.content.rendered} linksColor={color} />
      </section>}
  </div>
);

Page.propTypes = {
  isReady: React.PropTypes.bool,
  post: React.PropTypes.shape({
    content: React.PropTypes.shape({ rendered: React.PropTypes.string }),
  }),
  color: React.PropTypes.string,
  rtl: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  post: deps.selectors.getCurrentSingle(state),
  isReady: deps.selectors.isCurrentSingleReady(state),
  color: deps.selectorCreators.getSetting('theme', 'color')(state),
  siteUrl: deps.selectorCreators.getSetting('generalSite', 'url')(state),
  rtl: deps.selectorCreators.getSetting('theme', 'rtl')(state),
});

export default connect(mapStateToProps)(Page);
