import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { useIntl } from 'react-intl';
import { ConditionalLink, UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';

const DefaultTemplate = (props) => {
  const {
    items,
    linkTitle,
    linkHref,
    isEditMode,
    data,
    extension = 'cardTemplates',
  } = props;
  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <UniversalLink href={href}>{linkTitle || href}</UniversalLink>;
  }

  const intl = useIntl();

  const teaserExtenstions =
    config.blocks.blocksConfig?.teaser?.extensions[extension].items;
  let activeItem = teaserExtenstions.find(
    (item) => item.id === props?.[extension],
  );
  const extenionSchemaEnhancer = activeItem?.schemaEnhancer;
  if (extenionSchemaEnhancer)
    extenionSchemaEnhancer({
      schema: cloneDeep(config.blocks.blocksConfig?.teaser?.blockSchema),
      data: data || props,
      intl,
    });
  const ExtensionToRender = activeItem?.template;

  return (
    <>
      <div className="items">
        {items.map((item) => (
          <div className="listing-item" key={item['@id']}>
            {/* <ConditionalLink item={item} condition={!isEditMode}>
              <div className="listing-body">
                <h4>{item.title ? item.title : item.id}</h4>
                <p>{item.description}</p>
              </div>
            </ConditionalLink> */}
            <ExtensionToRender
              data={{
                ...item,
                href: [item?.['@id']],
                preview_image: item.image_scales.preview_image,
              }}
              {...props}
            />
          </div>
        ))}
      </div>

      {link && <div className="footer">{link}</div>}
    </>
  );
};

DefaultTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};
export default DefaultTemplate;
