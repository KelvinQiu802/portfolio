import Content from '../components/Blog/Content';
import Head from 'next/head';
import Footer from '../components/Footer';
import Wrapper from '../components/Wrapper';
import { getSortedPostData } from '../utils/postTools';

const blog = ({ posts }) => {
  return (
    <Wrapper>
      <Head>
        <title>Kelvin&apos;s Blog</title>
      </Head>
      <Content posts={posts} />
      <Footer />
    </Wrapper>
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
