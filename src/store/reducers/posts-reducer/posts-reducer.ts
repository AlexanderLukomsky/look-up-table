import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from 'src/api/api';
import { PostAPIType, UpdatePostType } from 'src/api/types';
import { ByIdType } from 'src/utils/types';
import { getAllComments } from 'src/store/reducers/comments-reducer';

export type PostType = { commentsIds: string[]; authorsId: string } & Pick<
  PostAPIType,
  'id' | 'text' | 'likes'
>;

const initialState = {
  allIds: [] as string[],
  byId: {} as ByIdType<PostType>,
};

const mapToLookUpTable = (posts: PostAPIType[]): typeof initialState =>
  posts.reduce(
    (acc, post) => {
      acc.byId[post.id] = {
        id: post.id,
        text: post.text,
        likes: post.likes,
        authorsId: post.author.id,
        commentsIds: post.lastComments.map((comment) => comment.id),
      };
      acc.allIds.push(post.id);
      return acc;
    },
    { byId: {} as ByIdType<PostType>, allIds: [] as string[] },
  );

const slice = createSlice({
  name: 'Posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const postTable = mapToLookUpTable(action.payload);
        state.byId = postTable.byId;
        state.allIds = postTable.allIds;
      })

      .addCase(updatePost.fulfilled, (state, action) => {
        state.byId[action.payload.id] = {
          ...state.byId[action.payload.id],
          text: action.payload.text,
        };
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        if (action.payload) {
          state.byId[action.payload.postId].commentsIds.push(
            ...action.payload.comments.map((comment) => comment.id),
          );
        }
      });
  },
});

export const fetchPosts = createAsyncThunk<PostAPIType[], undefined, { rejectValue: string }>(
  'Posts/fetchPosts',
  async () => {
    const posts = await api.getPosts();

    return posts;
  },
);

export const updatePost = createAsyncThunk<UpdatePostType, UpdatePostType, { rejectValue: string }>(
  'Posts/updatePost',
  async (data) => {
    await api.updatePost(data);

    return data;
  },
);

export const postsReducer = slice.reducer;
