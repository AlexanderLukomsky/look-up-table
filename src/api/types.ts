export type PostAPIType = {
  id: string;
  text: string;
  likes: number;
  author: AuthorAPIType;
  lastComments: CommentAPIType[];
};

export type AuthorAPIType = {
  id: string;
  name: string;
};

export type CommentAPIType = {
  id: string;
  text: string;
  author: AuthorAPIType;
};

export type UpdatePostType = {
  id: string;
  text: string;
};

export type CommentsType = {
  postId: string;
  comments: CommentAPIType[];
};
