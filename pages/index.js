import Head from 'next/head';
import Avatar from '../components/Home/Avatar';
import Wrapper from '../components/Wrapper';
import Content from '../components/Home/Content';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Kelvin Qiu</title>
      </Head>
      <Wrapper>
        <Avatar />
        <Content />
      </Wrapper>
    </div>
  );
};

export default Home;
