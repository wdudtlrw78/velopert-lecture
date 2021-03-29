const sleep = n => new Promise(resolve => setTimeout(resolve, n));

// { id, title, body }
const posts = [
  {
    id: 1,
    title: 'test1',
    body: 'test1',
  },
  {
    id: 2,
    title: 'test2',
    body: 'test2',
  },
  {
    id: 3,
    title: 'test3',
    body: 'test3',
  }
];

export const getPosts = async () => {
  await sleep(500);
  return posts;
}

export const getPostById = async (id)=> {
  await sleep(500);
  return posts.find(post => post.id === id);
}