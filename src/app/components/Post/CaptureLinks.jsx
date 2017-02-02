/* eslint-disable no-undef, jsx-a11y/no-static-element-interactions */
import { isCordova } from 'worona-deps';
import React from 'react';
import { connect } from 'react-redux';
import urllite from 'urllite';
import * as deps from '../../deps';

class CaptureLinks extends React.Component {
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

    // Remove blur.
    el.blur();

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

    // Ignore links that don't share a host with ours.
    if (linkUrl.host !== siteUrl.host) {
      if (isCordova) {
        // If we are not inside Cordova, do nothing.
        return;
      }
      // If we are inside Cordova, use navigator to open the external browser.
      e.preventDefault();
      if (device.platform === 'Android') {
        navigator.app.loadUrl(linkUrl, { openExternal: true });
      } else {
        window.open(linkUrl, '_system');
      }
    }

    // Prevent :focus from sticking; preventDefault() stops blur in some browsers
    e.preventDefault();

    this.props.deepUrlVisited({ url: el.href });
  }

  render() {
    return <div onClick={this.onClick}>{this.props.children}</div>;
  }
}
CaptureLinks.propTypes = {
  siteUrl: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
  deepUrlVisited: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  siteUrl: deps.selectorCreators.getSetting('generalSite', 'url')(state),
});

const mapDispatchToProps = dispatch => ({
  deepUrlVisited: ({ url }) => dispatch(deps.actions.deepUrlVisited({ url })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CaptureLinks);
