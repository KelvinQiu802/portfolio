import Head from 'next/head';
import Wrapper from '../../components/Wrapper';
import { getAllIds, getPostById } from '../../utils/postTools';
import styles from '../../styles/Markdown.module.css';
import Cd from '../../components/Cd';
import Footer from '../../components/Footer';

const Post = ({ data }) => {
  return (
    <Wrapper>
      <Head>
        <title>{data.title}</title>
      </Head>
      <p className={styles.title}>{data.title}</p>
      <p className={styles.date}>{data.date}</p>
      <article className='md'>
        <div dangerouslySetInnerHTML={{ __html: data.htmlContent }} />
      </article>
      <Cd />
      <Footer />
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
