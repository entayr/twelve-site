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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.header-menu': SharedHeaderMenu;
      'shared.menu-item': SharedMenuItem;
    }
  }
}
