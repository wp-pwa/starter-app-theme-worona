/* eslint-disable react/no-danger */
import React from 'react';
import cheerio from 'cheerio';
import CaptureLinks from './CaptureLinks';
import * as libs from '../../libs';

const ContentHtml = ({ html, linksColor }) => {
  const $ = cheerio.load(html);
  $('a').attr('style', `color: ${libs.darkenColor(linksColor)};`).attr('target', '_blank');
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
