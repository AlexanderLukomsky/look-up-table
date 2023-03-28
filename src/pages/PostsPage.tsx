import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Comment } from 'src/components/comment';
import { Post } from 'src/components/post';
import { getAllComments } from 'src/store/reducers/comments-reducer';
import { fetchPosts, updatePost } from 'src/store/reducers/posts-reducer';
import { useAppDispatch } from 'src/store/store';

import {
  selectAuthorsById,
  selectCommentsById,
  selectPostsAllIds,
  selectPostsById,
} from 'src/utils/selectors';
import commentsStyleUl from './style';

export const PostsPage = () => {
  const dispatch = useAppDispatch();
  const postsById = useSelector(selectPostsById);
  const postsAllIds = useSelector(selectPostsAllIds);
  const authorsById = useSelector(selectAuthorsById);
  const commentsById = useSelector(selectCommentsById);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleButtonClick = async (postId: string) => {
    setButtonDisabled(true);
    await dispatch(getAllComments(postId));
    setButtonDisabled(false);
  };

  const handleEditTextBlur = async (postId: string, text) => {
    await dispatch(updatePost({ id: postId, text }));
  };

  if (!postsAllIds.length) return <div>...loading</div>;

  return (
    <ul style={{ display: 'flex', gap: '15px', justifyContent: 'center', padding: '10px' }}>
      {postsAllIds.map((id) => (
        <Post
          key={id}
          post={postsById[id]}
          author={authorsById[postsById[id].authorsId]}
          buttonDisabled={buttonDisabled}
          onButtonClick={() => handleButtonClick(id)}
          onEditTextBlur={(value) => handleEditTextBlur(id, value)}
        >
          <ul style={commentsStyleUl}>
            {commentsById[id].map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                author={authorsById[comment.authorId].name}
              />
            ))}
          </ul>
        </Post>
      ))}
    </ul>
  );
};
