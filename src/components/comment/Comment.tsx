import { FC } from 'react';
import { CommentType } from 'src/store/reducers/comments-reducer';
import liStyle from './style';

export const Comment: FC<CommentProps> = ({ comment, author }) => (
  <li style={liStyle} key={comment.id}>
    <span style={{ marginRight: '10px' }}>
      <b>{author}</b>
      <b>:</b>
    </span>
    <span>{comment.text}</span>
  </li>
);

type CommentProps = {
  comment: CommentType;
  author: string;
};
