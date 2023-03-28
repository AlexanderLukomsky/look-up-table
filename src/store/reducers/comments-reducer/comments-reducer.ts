import { fetchPosts } from 'src/store/reducers/posts-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ByIdType } from 'src/utils/types';
import { CommentAPIType, CommentsType, PostAPIType } from 'src/api/types';
import { api } from 'src/api/api';

export type CommentType = { authorId: string } & Pick<CommentAPIType, 'id' | 'text'>;

const mapToLookUpTable = (posts: PostAPIType[]): typeof initialState =>
  posts.reduce(
    (acc, post) => {
      acc.byId[post.id] = [];

      post.lastComments.forEach((comment) => {
        acc.byId[post.id].push({
          id: comment.id,
          text: comment.text,
          authorId: comment.author.id,
        });
      });

      return acc;
    },
    {
      byId: {} as ByIdType<CommentType[]>,
    },
  );

const initialState = {
  byId: {} as ByIdType<CommentType[]>,
};

const slice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const commentsTable = mapToLookUpTable(action.payload);
        state.byId = commentsTable.byId;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        if (action.payload) {
          state.byId[action.payload.postId].push(
            ...action.payload.comments.map((comment) => ({
              id: comment.id,
              text: comment.text,
              authorId: comment.author.id,
            })),
          );
        }
      });
  },
});

export const getAllComments = createAsyncThunk<
  CommentsType | undefined,
  string,
  { rejectValue: string }
>('comments/getAllComments', async (postId) => {
  const data = api.getComments(postId);
  return data;
});

export const commentsReducer = slice.reducer;
