import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import cloneDeep from 'lodash/cloneDeep';
import config from '@plone/volto/registry';

const TeaserBlockImageVariation = (props) => {
  const { data, extension = 'cardTemplates' } = props;
  const intl = useIntl();

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
  const ExtensionToRender = activeItem?.template;

  return ExtensionToRender ? (
    <div>
      <ExtensionToRender {...props} />
    </div>
  ) : null;
};

TeaserBlockImageVariation.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserBlockImageVariation;
