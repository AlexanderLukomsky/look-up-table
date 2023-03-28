import { FC, ReactNode, useState } from 'react';
import { AuthorAPIType } from 'src/api/types';
import { PostType } from 'src/store/reducers/posts-reducer';
import { Button } from 'src/components/button';
import liStyle from './style';
import { EditableText } from '../editable-text';

export const Post: FC<PostProps> = ({
  post,
  author,
  children,
  buttonDisabled,
  onButtonClick,
  onEditTextBlur,
}) => {
  const [text, setText] = useState(post.text);

  const handleBlur = async () => {
    if (post.text === text) {
      return;
    }

    await onEditTextBlur(text);
  };

  return (
    <li style={liStyle}>
      <h2>{author.name}</h2>

      <EditableText
        onBlur={handleBlur}
        onChange={(value) => {
          setText(value);
        }}
      >
        {text}
      </EditableText>
      <div>
        <span> likes:</span>
        <span style={{ padding: '0 5px' }}>
          <b>{post.likes}</b>
        </span>
      </div>

      <div
        style={{
          padding: '10px',
          borderRadius: '10px',
          width: '100%',
          boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
        }}
      >
        <div style={{ padding: '5px 0' }}>
          <b> comments:</b>
        </div>

        {children}
      </div>
      <Button disabled={buttonDisabled} onClick={onButtonClick}>
        get all
      </Button>
    </li>
  );
};

export type PostProps = {
  post: PostType;
  author: AuthorAPIType;
  children: ReactNode;
  buttonDisabled?: boolean;
  onButtonClick: () => void;
  onEditTextBlur: (value: string) => void | Promise<unknown>;
};
