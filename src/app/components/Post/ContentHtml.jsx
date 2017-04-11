/* eslint-disable react/no-danger, no-undef */
import React from 'react';
import cheerio from 'cheerio';
import CaptureLinks from './CaptureLinks';
import * as libs from '../../libs';

const ContentHtml = ({ html, linksColor }) => {
  const $ = cheerio.load(html);
  $('a').attr('style', `color: ${libs.darkenColor(linksColor)};`).attr('target', '_blank');
  $('img').each((i, e) => {
    const src = $(e).attr('src');
    const srcset = $(e).attr('srcset');
    if (src.startsWith('http://') && window.location.protocol === 'https:') {
      if (src) $(e).attr('src', `https://cors.worona.io/${src}`);
      if (srcset)
        $(e).attr('srcset', srcset.replace(/http:\/\//g, 'https://cors.worona.io/http://'));
    }
  });
  return (
    <CaptureLinks>
      <div
        style={{ overflow: 'hidden' }}
        className="content is-medium"
        dangerouslySetInnerHTML={{ __html: $.html() }}
      />
    </CaptureLinks>
  );
};
ContentHtml.propTypes = {
  html: React.PropTypes.string,
  linksColor: React.PropTypes.string,
};

export default ContentHtml;
