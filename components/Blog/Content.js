import Wrapper from '../Wrapper';
import Post from './Post';
import styles from '../../styles/Blog.module.css';

const content = ({ posts }) => {
  return (
    <Wrapper>
      <h2 className={styles.title}>Posts</h2>
      {posts.map((post) => (
        <Post title={post.title} date={post.date} id={post.id} key={post.id} />
      ))}
    </Wrapper>
  );
};

export default content;
