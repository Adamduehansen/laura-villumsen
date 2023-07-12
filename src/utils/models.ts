export interface WorkTeaser {
  id: string;
  title: string;
  date: string;
}

export interface ServiceResponse<TData> {
  error?: unknown;
  data: TData;
}

export interface MenuNavigationItem {
  id: string;
  text: string;
  url: string;
}

export interface PageData {
  siteName: string;
  title: string;
  navigationItems: MenuNavigationItem[];
}

export type PageProps<TProps> = PageData & TProps;
