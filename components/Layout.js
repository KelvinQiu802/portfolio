import Head from 'next/head';
import NavBar from './NavBar';
import React from 'react';

const Layout = ({ children }) => {
  const [mode, setMode] = React.useState('light');

  React.useEffect(() => {
    if (localStorage.getItem('mode')) {
      setMode(localStorage.getItem('mode'));
    }
  }, []);

  return (
    <div className='layout' color-mode={mode}>
      <Head>
        <link rel='shortcut icon' href='/favicon.svg' type='image/x-icon' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Cedarville+Cursive&family=Inter:wght@300;400;500;600&display=swap'
          rel='stylesheet'
        />
        <meta
          name='description'
          content='My portfolio website contains blogs and projects.'
          key='desc'
        />
      </Head>
      <main>
        <NavBar setMode={setMode} mode={mode} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
