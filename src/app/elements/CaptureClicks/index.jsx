import React from 'react';

class CaptureClicks extends React.Component {

  getDefaultProps: function() {
    return {
      component: 'div',
      environment: Environment.defaultEnvironment,
      gotoURL: function(url) {
        // We should really just be allowing the event's default action, be we
        // can't make the decision to do that synchronously.
        window.location.href = url;
      }
    };
  },

  onClick: function(e) {
    if (this.props.onClick) {
      var shouldProceed = this.props.onClick(e);
      if (shouldProceed === false) return;
    }

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
    var el = e.target;
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

    // Ignore hash (used often instead of javascript:void(0) in strict CSP envs)
    if (el.getAttribute('href') === '#' && !(this.props.environment instanceof HashEnvironment)) {
      return;
    }

    // Use a regular expression to parse URLs instead of relying on the browser
    // to do it for us (because IE).
    var url = urllite(el.href);
    var windowURL = urllite(window.location.href);

    // Ignore links that don't share a protocol and host with ours.
    if (url.protocol !== windowURL.protocol || url.host !== windowURL.host) {
      return;
    }

    // Ignore 'rel="external"' links.
    if (el.rel && /(?:^|\s+)external(?:\s+|$)/.test(el.rel)) {
      return;
    }

    // Prevent :focus from sticking; preventDefault() stops blur in some browsers
    el.blur();
    e.preventDefault();

    // Mark if any of our routers matched. If they didn't, we'll call gotoURL.
    var matched = false;

    var onBeforeNavigation = function(path, navigation, match) {
      if (match && match.match) {
        matched = true;
      }
    }

    var gotoURL = this.props.gotoURL;
    this.props.environment.navigate(
      url.pathname + (url.hash.length > 1 ? url.hash : ''),
      {onBeforeNavigation: onBeforeNavigation},
      function(err, info) {
        if (err) {
          throw err;
        }
        // No routers matched - so we'll escape out using gotoURL.
        if (!matched) gotoURL(el.href);
      });
  },

  render: function() {
    var props = assign({}, this.props, {
      onClick: this.onClick
    });
    props = omit(props, PROP_KEYS);
    return React.createElement(this.props.component, props, this.props.children);
  }

});
