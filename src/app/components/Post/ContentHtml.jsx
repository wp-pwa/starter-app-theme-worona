/* eslint-disable react/no-danger, no-undef, jsx-a11y/no-static-element-interactions */
import React from 'react';
import cheerio from 'cheerio';
import urllite from 'urllite';
import * as libs from '../../libs';

class ContentHtml extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    // Ignore canceled events, modified clicks, and right clicks.
    if (e.defaultPrevented) {
      return;
    }

    if (e.metaKey || e.ctrlKey || e.shiftKey) {
      return;
    }

    if (e.button !== 0) {
      return;
    }

    // Get the <a> element.
    let el = e.target;
    while (el && el.nodeName !== 'A') {
      el = el.parentNode;
    }

    // Ignore clicks from non-a elements.
    if (!el) {
      return;
    }

    // Ignore the click if the element has a target.
    if (el.target && el.target !== '_self') {
      return;
    }

    // Ignore the click if it's a download link. (We use this method of
    // detecting the presence of the attribute for old IE versions.)
    if (el.attributes.download) {
      return;
    }

    // Ignore 'rel="external"' links.
    if (el.rel && /(?:^|\s+)external(?:\s+|$)/.test(el.rel)) {
      return;
    }


    // Use a regular expression to parse URLs instead of relying on the browser
    // to do it for us (because IE).
    const linkUrl = urllite(el.href);
    const siteUrl = urllite(this.props.siteUrl);

    // Ignore links that don't share a protocol and host with ours.
    if (linkUrl.host !== siteUrl.host) {
      return;
    }

    // Prevent :focus from sticking; preventDefault() stops blur in some browsers
    el.blur();
    e.preventDefault();

    console.log(el.href);
  }

  render() {
    const $ = cheerio.load(this.props.html);
    $('a').attr('style', `color: ${libs.darkenColor(this.props.linksColor)};`);
    return (
      <div
        id="contentHtml"
        onClick={this.onClick}
        style={{ overflow: 'hidden' }}
        className="content is-medium"
        dangerouslySetInnerHTML={{ __html: $.html() }}
      />
    );
  }
}
ContentHtml.propTypes = {
  html: React.PropTypes.string,
  linksColor: React.PropTypes.string,
  siteUrl: React.PropTypes.string,
};

export default ContentHtml;
