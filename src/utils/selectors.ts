import { AuthorAPIType } from 'src/api/types';
import { AppRootStateType } from 'src/store';
import { CommentType } from 'src/store/reducers/comments-reducer';
import { PostType } from 'src/store/reducers/posts-reducer';
import { ByIdType } from './types';

export const selectPostsById = (state: AppRootStateType): { [key: string]: PostType } =>
  state.posts.byId;

export const selectPostsAllIds = (state: AppRootStateType): string[] => state.posts.allIds;

export const selectAuthorsById = (state: AppRootStateType): { [key: string]: AuthorAPIType } =>
  state.authors.byId;

export const selectCommentsById = (state: AppRootStateType): ByIdType<CommentType[]> =>
  state.comments.byId;
