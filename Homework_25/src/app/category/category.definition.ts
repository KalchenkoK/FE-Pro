export interface CategoryCreateBody {
  name: string;
}
export interface CategoryCreateParams {
  сategoryId: string;
}

export interface CategoryFindParams {
  categoryId: string;
}
export interface CategoryDeleteParams {
  categoryId: string;
}

export interface CategoryUpdateParams extends CategoryCreateParams {
  categoryId: string;
}

export interface CategoryUpdateBody extends CategoryCreateBody {}

export interface CategoryListParams extends CategoryCreateParams {}
