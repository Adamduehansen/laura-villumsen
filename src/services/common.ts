import { NavigationItem } from '@/utils/models';

export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails: {
      height: number;
      width: number;
    };
  };
}

export interface MenuItemWPGraphQL {
  id: string;
  label: string;
  uri: string;
}

export interface MenuWPGRaphQL {
  name: string;
  menuItems: {
    nodes: MenuItemWPGraphQL[];
  };
}

export interface MenusWPGraphQL {
  nodes: MenuWPGRaphQL[];
}

export interface GeneralSettingsWPGraphQL {
  title: string;
  description: string;
}

function toMenuNavigationItem({
  id,
  label,
  uri,
}: MenuItemWPGraphQL): NavigationItem {
  return {
    id: id,
    text: label,
    url: uri,
  };
}

export function findNavigationItems(
  menus: MenuWPGRaphQL[],
  key: string,
): NavigationItem[] {
  const menu = menus.find((menu) => menu.name.toLowerCase() === key);

  if (menu === undefined) {
    return [];
  }

  return menu.menuItems.nodes.map(toMenuNavigationItem);
}
