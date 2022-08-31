import Content from '../components/Blog/content';
import Head from 'next/head';
import { getSortedPostData } from '../utils/postTools';

const blog = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Kelvin&apos;s Blog</title>
      </Head>
      <Content posts={posts} />
    </div>
  );
};

export default blog;

export const getStaticProps = async () => {
  const posts = await getSortedPostData();
  return {
    props: {
      posts,
    },
  };
};
