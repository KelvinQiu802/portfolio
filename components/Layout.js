import Head from 'next/head';
import React from 'react';
import NavBar from './NavBar';

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
