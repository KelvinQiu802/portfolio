import Head from 'next/head';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div className='layout' color-mode='light'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Cedarville+Cursive&family=Inter:wght@300;400;500;600&display=swap'
          rel='stylesheet'
        />
      </Head>
      <main>
        <NavBar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
