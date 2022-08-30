import Head from 'next/head';
import Avatar from '../components/Home/Avatar';
import Wrapper from '../components/Home/Wrapper';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Kelvin Qiu</title>
      </Head>
      <Wrapper>
        <Avatar />
      </Wrapper>
    </div>
  );
};

export default Home;
