export interface WorkTeaser {
  id: string;
  title: string;
  date: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface ServiceResponse<TData> {
  error?: unknown;
  data: TData;
}

export interface NavigationItem {
  id: string;
  text: string;
  url: string;
}

export interface PageData {
  siteName: string;
  title: string;
  navigationItems: NavigationItem[];
  socials: NavigationItem[];
}

export type PageProps<TProps = unknown> = PageData & TProps;
