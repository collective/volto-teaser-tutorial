import React from 'react';
import TeaserBody from '@plone/volto/components/manage/Blocks/Teaser/Body';
import { withBlockExtensions } from '@plone/volto/helpers';

const TeaserView = (props) => {
  return <TeaserBody {...props} extraProps={{ foo: 'bar' }} />;
};

export default withBlockExtensions(TeaserView);
