import Content from '../components/blog/Content';
import Head from 'next/head';

const blog = () => {
  return (
    <div>
      <Head>
        <title>Kelvin's Blog</title>
      </Head>
      <Content />
    </div>
  );
};

export default blog;
