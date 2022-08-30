import Head from 'next/head';
import Avatar from '../components/Home/Avatar';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Kelvin Qiu</title>
      </Head>
      <Avatar />
    </div>
  );
};

export default Home;
