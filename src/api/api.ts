import { CommentAPIType } from 'src/api/types';
import { v4 } from 'uuid';
import { PostAPIType, UpdatePostType, CommentsType } from './types';

const ALEX_ID = v4();
const HANNA_ID = v4();
const JOHN_ID = v4();
const SMITH_ID = v4();

const posts: PostAPIType[] = [
  {
    id: v4(),
    text: 'Hello',
    likes: 10,
    author: {
      id: HANNA_ID,
      name: 'Hanna',
    },
    lastComments: [
      { id: v4(), text: "What's up", author: { id: ALEX_ID, name: 'Alex' } },
      { id: v4(), text: 'Hey', author: { id: JOHN_ID, name: 'John' } },
    ],
  },
  {
    id: v4(),
    text: 'I like React',
    likes: 2000,
    author: {
      id: ALEX_ID,
      name: 'Alex',
    },
    lastComments: [
      { id: v4(), text: 'Too', author: { id: JOHN_ID, name: 'John' } },
      { id: v4(), text: 'Also', author: { id: HANNA_ID, name: 'Hanna' } },
    ],
  },
  {
    id: v4(),
    text: 'Hey',
    likes: 100,
    author: {
      id: JOHN_ID,
      name: 'John',
    },
    lastComments: [
      { id: v4(), text: 'Hi', author: { id: ALEX_ID, name: 'Alex' } },
      { id: v4(), text: 'Hello', author: { id: HANNA_ID, name: 'Hanna' } },
    ],
  },
];

const comments = (): CommentsType[] =>
  posts.map((post, i) => {
    const additionalComments = [] as CommentAPIType[];

    while (i >= 0) {
      additionalComments.push({
        id: v4(),
        text: `additional comments for ${post.author.name}`,
        author: { id: SMITH_ID, name: 'Smith' },
      });

      i -= 1;
    }

    return {
      postId: post.id,
      comments: [
        {
          id: v4(),
          text: `comments for ${post.author.name}`,
          author: { id: ALEX_ID, name: 'Alex' },
        },
        {
          id: v4(),
          text: `comments for ${post.author.name}`,
          author: { id: HANNA_ID, name: 'Hanna' },
        },
        {
          id: v4(),
          text: `comments for ${post.author.name}`,
          author: { id: JOHN_ID, name: 'John' },
        },
        {
          id: v4(),
          text: `comments for ${post.author.name}`,
          author: { id: HANNA_ID, name: 'Hanna' },
        },
        ...additionalComments,
      ],
    };
  });

class API {
  getPosts(): Promise<PostAPIType[]> {
    return new Promise((res) => {
      setTimeout(() => {
        res(posts);
      }, 1500);
    });
  }

  updatePost(data: UpdatePostType): Promise<UpdatePostType> {
    return new Promise((res) => {
      setTimeout(() => {
        res(data);
      }, 1500);
    });
  }

  getComments(postId: string): Promise<CommentsType | undefined> {
    return new Promise((res) => {
      setTimeout(() => {
        res(comments().find((comments) => comments.postId === postId));
      }, 1500);
    });
  }
}

export const api = new API();
