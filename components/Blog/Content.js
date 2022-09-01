import Wrapper from '../Wrapper';
import Post from './Post';
import styles from '../../styles/Blog.module.css';

const content = ({ posts }) => {
  return (
    <Wrapper>
      <p className={styles.year}>2022</p>
      {posts
        .filter((post) => post.date.includes('2022'))
        .map((post) => (
          <Post
            title={post.title}
            date={post.date}
            id={post.id}
            key={post.id}
          />
        ))}
    </Wrapper>
  );
};

export default content;
