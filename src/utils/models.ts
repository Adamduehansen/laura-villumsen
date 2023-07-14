export interface WorkTeaser {
  id: string;
  title: string;
  date: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
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
  subName: string;
  title: string;
  navigationItems: NavigationItem[];
  socials: NavigationItem[];
}

export type PageProps<TProps = unknown> = PageData & TProps;
