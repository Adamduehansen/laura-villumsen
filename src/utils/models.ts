export interface ServiceResponse<TData> {
  error?: unknown;
  data: TData;
}

export interface PageData {
  siteName: string;
  subName: string;
  title: string;
  navigationItems: NavigationItem[];
  socials: NavigationItem[];
}

export interface NavigationItem {
  id: string;
  text: string;
  url: string;
}

export interface WorkTeaser {
  id: string;
  title: string;
  path: string;
  date: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export interface Tag {
  id: string;
  name: string;
}

export type WorkData = PageData & {
  content: string;
  tags: Tag[];
  date: string;
};

export type PageProps<TProps = unknown> = PageData & TProps;
