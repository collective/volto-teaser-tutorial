import MyTeaserView from 'volto-teaser-tutorial/components/MyTeaserView';
import TeaserBlockImageVariation from 'volto-teaser-tutorial/components/TeaserBlockImageVariation';
import TeaserBlockImageDefault from 'volto-teaser-tutorial/components/extensions/TeaserBlockImageDefault';
import TeaserBlockImageRight from 'volto-teaser-tutorial/components/extensions/TeaserBlockImageRight';
import TeaserBlockImageOverlay from 'volto-teaser-tutorial/components/extensions/TeaserBlockImageOverlay';
import { myDataOwnAdapter } from 'volto-teaser-tutorial/components/data-adapter';
import { addExtensionFieldToSchema } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const applyConfig = (config) => {
  config.blocks.blocksConfig.teaser.view = MyTeaserView;
  config.blocks.blocksConfig.teaser.variations = [
    ...config.blocks.blocksConfig.teaser.variations,
    {
      id: 'image-top-variation',
      title: 'Image(Top) variation',
      template: TeaserBlockImageVariation,
      isDefault: false,
      schemaEnhancer: ({ schema, FormData, intl }) => {
        const extension = 'cardTemplates';
        schema.fieldsets.push({
          id: 'Cards',
          title: 'Cards',
          fields: [],
        });
        addExtensionFieldToSchema({
          schema,
          name: extension,
          items: config.blocks.blocksConfig.teaser.extensions[extension]?.items,
          intl,
          title: { id: 'Card Type' },
          insertFieldToOrder: (schema, extension) => {
            const cardFieldSet = schema.fieldsets.find(
              (item) => item.id === 'Cards',
            ).fields;
            if (cardFieldSet.indexOf(extension) === -1)
              cardFieldSet.unshift(extension);
          },
        });
        schema.fieldsets[0].fields.push('creationDate');
        schema.properties.creationDate = {
          title: 'Show creation Date',
          type: 'boolean',
        };
        schema.properties.href.selectedItemAttrs.push('CreationDate');

        schema.properties.styles.schema.properties.objectFit = {
          title: 'Object fit',
          description: 'Css object fit property',
          choices: [
            ['cover', 'cover'],
            ['contain', 'contain'],
            ['fill', 'fill'],
            ['scale-down', 'scale-down'],
            ['none', 'none'],
          ],
        };

        schema.properties.styles.schema.fieldsets[0].fields.push('objectFit');
        return schema;
      },
    },
  ];
  config.blocks.blocksConfig.teaser.extensions = {
    ...(config.blocks.blocksConfig.teaser.extensions || {}),
    cardTemplates: {
      items: [
        {
          id: 'card',
          isDefault: true,
          title: 'Card (default)',
          template: TeaserBlockImageDefault,
          //schemaEnhancer: composeSchema(setCardModelSchema, setCardStylingSchema),
        },
        {
          id: 'imageOnRight',
          isDefault: false,
          title: 'Image Right',
          template: TeaserBlockImageRight,
          // schemaEnhancer: composeSchema(setCardModelSchema, setCardStylingSchema),
        },
        {
          id: 'imageOverlay',
          isDefault: false,
          title: 'Image Overlay',
          template: TeaserBlockImageOverlay,
          // schemaEnhancer: composeSchema(setCardModelSchema, setCardStylingSchema),
          // excludedFromVariations: ['cardsCarousel', 'cardsGallery'],
        },
      ],
    },
  };
  config.blocks.blocksConfig.teaser.dataAdapter = myDataOwnAdapter;
  if (
    config.blocks.blocksConfig?.__grid?.blocksConfig?.teaser &&
    config.blocks.blocksConfig?.teaser
  ) {
    //This ensures that grid block uses our overrideen teaser
    config.blocks.blocksConfig.__grid.blocksConfig.teaser =
      config.blocks.blocksConfig.teaser;
  }

  return config;
};

export default applyConfig;
