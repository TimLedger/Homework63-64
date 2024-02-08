import React from 'react';
import { ApiPosts } from '../../types';
import './PostList.css'; 

interface Props {
  posts: ApiPosts | null;
}

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <ul className="post-list"> 
      {posts && Object.keys(posts).map((id) => {
        const post = posts[id];
        return (
          <li key={id} className="post-item"> 
            <h2 className="post-title">{post.description.title}</h2>
            <p className="post-comment">{post.description.comment}</p>
            <div className="post-bottom">
                <a className="post-link" href="#">Читать больше...</a>
                <p className="post-time">{post.description.time}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
