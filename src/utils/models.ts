export interface WorkTeaser {
  id: string;
  title: string;
  date: string;
}

export interface ServiceResponse<TData> {
  error?: string;
  data: TData;
}
