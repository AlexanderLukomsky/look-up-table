import { getAllComments } from 'src/store/reducers/comments-reducer/comments-reducer';
import { fetchPosts } from 'src/store/reducers/posts-reducer';
import { AuthorAPIType } from 'src/api/types';
import { createSlice } from '@reduxjs/toolkit';
import { ByIdType } from 'src/utils/types';

const initialState = {
  byId: {} as ByIdType<AuthorAPIType>,
};

const mapToLookUpTable = (items: AuthorAPIType[]): typeof initialState =>
  items.reduce(
    (acc, item) => {
      acc.byId[item.id] = item;

      return acc;
    },
    { byId: {} as ByIdType<AuthorAPIType> },
  );

const slice = createSlice({
  name: 'author',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const authorTable = mapToLookUpTable(action.payload.map((post) => post.author));
        state.byId = authorTable.byId;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        if (action.payload) {
          const authorTable = mapToLookUpTable(
            action.payload.comments.map((comment) => comment.author),
          );
          state.byId = { ...state.byId, ...authorTable.byId };
        }
      });
  },
});

export const authorsReducer = slice.reducer;
