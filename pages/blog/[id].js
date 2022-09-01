import Wrapper from '../../components/Wrapper';
import { getAllIds, getPostById } from '../../utils/postTools';

const Post = ({ content }) => {
  return <Wrapper>{content}</Wrapper>;
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
  const content = await getPostById(params.id);
  return {
    props: {
      content,
    },
  };
};
