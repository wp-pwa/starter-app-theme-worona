import React from 'react';
import dynamic from '@worona/next/dynamic';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';

const DynamicHome = dynamic(import('../Home'));
const DynamicPost = dynamic(import('../Post'));

const Theme = ({ type, Link }) =>
  <div>
    <Link query={{ p: 57 }} as="/ppooosst">
      <a>Link to post</a>
    </Link>
    <br />
    <Link as="/homeeee">
      <a>Link to home</a>
    </Link>
    <br />
    <Link query={{ cat: 7 }} as="/categoryyyy">
      <a>Link to category</a>
    </Link>

    {['home', 'category', 'tag', 'author'].includes(type) && <DynamicHome />}
    {['post', 'page'].includes(type) && <DynamicPost />}
  </div>;

const mapProps = state => ({
  type: dep('router', 'selectors', 'getType')(state),
  Link: dep('router', 'components', 'Link'),
});

export default connect(mapProps)(Theme);
