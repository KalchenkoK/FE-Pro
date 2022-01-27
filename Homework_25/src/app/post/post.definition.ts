export interface PostCreateBody {
  title: string;
  body: string;
}

export interface PostCreateParams {
  categoryId: string;
}

export interface PostListParams extends PostCreateParams {}

export interface PostFindParams extends PostCreateParams {
  postId: string;
}

export interface PostDeleteParams extends PostCreateParams {
  postId: string;
}

export interface PostUpdateParams extends PostCreateParams {
  postId: string;
}

export interface PostUpdateBody extends PostCreateBody {}
