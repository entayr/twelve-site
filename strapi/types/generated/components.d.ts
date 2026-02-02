import type { Schema, Struct } from '@strapi/strapi';

export interface SharedHeaderMenu extends Struct.ComponentSchema {
  collectionName: 'components_shared_header_menus';
  info: {
    displayName: 'headerMenu';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.menu-item', true>;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {};
}

export interface SharedMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_menu_items';
  info: {
    displayName: 'Menu item';
    icon: 'bulletList';
  };
  attributes: {
    isVisible: Schema.Attribute.Boolean;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer;
    type: Schema.Attribute.Enumeration<['internal', 'external']> &
      Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface SharedSectionsCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_sections_ctas';
  info: {
    displayName: 'sections.cta';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    ctaType: Schema.Attribute.Enumeration<['internal', 'external']>;
    ctaUrl: Schema.Attribute.String;
    text: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedSectionsFeatures extends Struct.ComponentSchema {
  collectionName: 'components_shared_sections_features';
  info: {
    displayName: 'sections.features';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.shared-feature-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedSectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_sections_heroes';
  info: {
    displayName: 'sections.hero';
  };
  attributes: {
    primaryCtaLabel: Schema.Attribute.String;
    primaryCtaType: Schema.Attribute.Enumeration<['internal', 'external']>;
    primaryCtaUrl: Schema.Attribute.String;
    subtitle: Schema.Attribute.Blocks;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSectionsMap extends Struct.ComponentSchema {
  collectionName: 'components_shared_sections_map';
  info: {
    displayName: 'sections.map';
  };
  attributes: {
    height: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<420>;
    title: Schema.Attribute.String;
    yandexMapUrl: Schema.Attribute.Text;
  };
}

export interface SharedSectionsRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_sections_rich_texts';
  info: {
    displayName: 'sections.rich-text';
  };
  attributes: {
    body: Schema.Attribute.Blocks;
  };
}

export interface SharedSharedFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_shared_feature_items';
  info: {
    displayName: 'shared.feature-item';
  };
  attributes: {
    icon: Schema.Attribute.String;
    text: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.header-menu': SharedHeaderMenu;
      'shared.hero': SharedHero;
      'shared.menu-item': SharedMenuItem;
      'shared.sections-cta': SharedSectionsCta;
      'shared.sections-features': SharedSectionsFeatures;
      'shared.sections-hero': SharedSectionsHero;
      'shared.sections-map': SharedSectionsMap;
      'shared.sections-rich-text': SharedSectionsRichText;
      'shared.shared-feature-item': SharedSharedFeatureItem;
    }
  }
}
