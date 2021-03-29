import React from 'react';
import PostContainer from '../Containers/PostContainer';

function PostPage({ match }) {
  const { id } = match.parms;
  const postId = parseInt(id, 10);

  return (
    <PostContainer postId={postId} />
  );
}

export default PostPage