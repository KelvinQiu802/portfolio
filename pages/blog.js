import Content from '../components/blog/Content';
import Head from 'next/head';
import { getSortedPostData } from '../utils/postTools';

const Blog = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Kelvin&apos;s Blog</title>
      </Head>
      <Content posts={posts} />
    </div>
  );
};

export default Blog;

export const getStaticProps = async () => {
  const posts = await getSortedPostData();
  return {
    props: {
      posts,
    },
  };
};
