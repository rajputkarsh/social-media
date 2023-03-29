
export interface ICustomObject{
  [key: string]: string | number | Object,
}

export type PaginationOptions = ({
  $skip: number;
} | {
  $limit: number;
})[];