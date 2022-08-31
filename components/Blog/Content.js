import Wrapper from '../Wrapper';
import Post from './Post';

const content = ({ posts }) => {
  return (
    <Wrapper>
      {posts.map((post) => (
        <Post title={post.title} date={post.date} id={post.id} key={post.id} />
      ))}
    </Wrapper>
  );
};

export default content;
