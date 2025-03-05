export type Errors = string | string[] | undefined | null;

export type QueryParams = {
  name: string;
  value?: string;
}[];

export type RequestPayload<T> = {
  payload: T;
};

export type Response<T> = {
  message: string;
  code: number;
  data: ResponseData<T>;
};

export type ResponseData<T> =
  | null
  | number
  | string
  | SearchResult<T>
  | T
  | T[];

export type SearchResult<T> = {
  data: T;
  page: number;
  searchTotal: number;
};
