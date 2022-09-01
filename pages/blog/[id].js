import Head from 'next/head';
import Wrapper from '../../components/Wrapper';
import { getAllIds, getPostById } from '../../utils/postTools';

const Post = ({ data }) => {
  return (
    <Wrapper>
      <Head>
        <title>{data.title}</title>
      </Head>
      {data.title}
    </Wrapper>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const paths = await getAllIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const data = await getPostById(params.id);
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
