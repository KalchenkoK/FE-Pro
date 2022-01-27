export interface CommentCreateBody {
  body: string;
}

export interface CommentCreateParams {
  categoryId: string;
  postId: string;
}

export interface CommentUpdateParams extends CommentCreateParams {
  commentId: string;
}

export interface CommentUpdateBody extends CommentCreateBody {}

export interface CommentListParams extends CommentCreateParams {}

export interface CommentFindParams extends CommentCreateParams {
  commentId: string;
}

export interface CommentDeleteParams extends CommentCreateParams {
  commentId: string;
}
