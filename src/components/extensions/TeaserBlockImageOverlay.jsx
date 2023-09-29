import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import cloneDeep from 'lodash/cloneDeep';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import {
  flattenToAppURL,
  isInternalURL,
  addAppURL,
} from '@plone/volto/helpers';
import { MaybeWrap } from '@plone/volto/components';
import { formatDate } from '@plone/volto/helpers/Utils/Date';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import config from '@plone/volto/registry';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const DefaultImage = (props) => <img {...props} alt={props.alt || ''} />;

const TeaserBlockImageOverlay = (props) => {
  const { className, data, isEditMode, extension = 'cardTemplates' } = props;
  const locale = config.settings.dateLocale || 'en';
  const intl = useIntl();
  const href = data.href?.[0];
  const image = data.preview_image?.[0];
  const align = data?.styles?.align;
  const creationDate = data.href?.[0]?.CreationDate;
  const formattedDate = formatDate({
    date: creationDate,
    format: {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    },
    locale: locale,
  });

  const teaserExtenstions =
    config.blocks.blocksConfig?.teaser?.extensions[extension].items;
  let activeItem = teaserExtenstions.find(
    (item) => item.id === data[extension],
  );
  const extenionSchemaEnhancer = activeItem?.schemaEnhancer;
  if (extenionSchemaEnhancer)
    extenionSchemaEnhancer({
      schema: cloneDeep(config.blocks.blocksConfig?.teaser?.blockSchema),
      data,
      intl,
    });

  const hasImageComponent = config.getComponent('Image').component;
  const Image = config.getComponent('Image').component || DefaultImage;
  const { openExternalLinkInNewTab } = config.settings;

  return (
    <div className={cx('block teaser', className)}>
      <>
        {!href && isEditMode && (
          <Message>
            <div className="teaser-item placeholder">
              <img src={imageBlockSVG} alt="" />
              <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
            </div>
          </Message>
        )}
        {href && (
          <MaybeWrap
            condition={!isEditMode}
            as={UniversalLink}
            href={href['@id']}
            target={
              data.openLinkInNewTab ||
              (openExternalLinkInNewTab && !isInternalURL(href['@id']))
                ? '_blank'
                : null
            }
          >
            <div className="teaser-item overlay">
              {(href.hasPreviewImage || href.image_field || image) && (
                <div className="image-wrapper">
                  {/* <Image
                    src={
                      hasImageComponent
                        ? href
                        : defaultImageSrc ??
                          addAppURL(`${href}/${image?.download}`)
                    }
                    alt=""
                    loading="lazy"
                  /> */}
                  <Image
                    item={props['@type'] === 'listing' ? null : image || href}
                    src={
                      props['@type'] === 'listing'
                        ? addAppURL(`${href}/${image?.download}`)
                        : null
                    }
                    imageField={image ? image.image_field : href.image_field}
                    alt=""
                    loading="lazy"
                    responsive={true}
                  />
                </div>
              )}

              <div className="gradiant">
                {data?.head_title && (
                  <div className="headline">{data.head_title}</div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h2>{data?.title}</h2>
                  {!data.hide_description && <p>{data?.description}</p>}
                  {data?.creationDate && (
                    <p style={{ color: 'white' }}>{formattedDate}</p>
                  )}
                </div>
              </div>
            </div>
          </MaybeWrap>
        )}
      </>
    </div>
  );
};

TeaserBlockImageOverlay.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserBlockImageOverlay;
