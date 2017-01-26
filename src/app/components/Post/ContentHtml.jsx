/* eslint-disable react/no-danger */
import React from 'react';
import cheerio from 'cheerio';
import * as libs from '../../libs';

class ContentHtml extends React.Component {
  constructor(props) {
    super(props);
    this.html = this.props.html;
  }

  componentWillMount() {
    const $ = cheerio.load(this.props.html);
    $('a').attr('style', `color: ${libs.darkenColor(this.props.linksColor)};`);
    this.html = $.html();
  }

  render() {
    return (
      <div
        style={{ overflow: 'hidden' }}
        className="content is-medium"
        dangerouslySetInnerHTML={{ __html: this.html }}
      />
    );
  }
}
ContentHtml.propTypes = {
  html: React.PropTypes.string,
  linksColor: React.PropTypes.string,
};

export default ContentHtml;
