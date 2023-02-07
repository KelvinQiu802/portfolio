import Wrapper from '../Wrapper';
import Post from './Post';
import styles from '../../styles/Blog.module.css';

const FIRST_YEAR = 2022;
function getYears() {
  const date = new Date();
  let currentYear = date.getFullYear();
  const allYears = [];
  while (currentYear >= FIRST_YEAR) {
    allYears.push(currentYear);
    currentYear--;
  }
  return allYears;
}

const content = ({ posts }) => {
  return (
    <Wrapper>
      {getYears().map((year) => (
        <>
          <p className={styles.year} key={year}>
            {year}
          </p>
          {posts
            .filter((post) => post.date.includes(year))
            .map((post) => (
              <Post
                title={post.title}
                date={post.date}
                id={post.id}
                key={post.id}
              />
            ))}
        </>
      ))}
    </Wrapper>
  );
};

export default content;
