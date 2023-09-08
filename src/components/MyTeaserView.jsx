import React from 'react';
import TeaserBody from '@plone/volto/components/manage/Blocks/Teaser/Body';
import { withBlockExtensions } from '@plone/volto/helpers';

const MyDataProvider = (props) => {
  const enhancedChildren = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...props,
        enhancedProp: 'some-enhanced-prop',
      });
    }
    return child;
  });

  return enhancedChildren;
};

const TeaserView = (props) => {
  return (
    <MyDataProvider {...props}>
      <TeaserBody {...props} />
    </MyDataProvider>
  );
};

export default withBlockExtensions(TeaserView);
