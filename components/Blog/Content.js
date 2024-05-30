import Wrapper from '../Wrapper';
import Post from './Post';

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
      {posts.map((post) => (
        <Post title={post.title} date={post.date} id={post.id} key={post.id} />
      ))}
    </Wrapper>
  );
};

export default content;
