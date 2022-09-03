import Wrapper from '../components/Wrapper';
import styles from '../styles/Project.module.css';
import Item from '../components/Project/Item';
import Head from 'next/head';
import Footer from '../components/Footer';

const Project = () => {
  return (
    <Wrapper>
      <Head>
        <title>My Projects</title>
      </Head>
      <div className={styles.container}>
        <p className={styles.title}>Projects</p>
        <div className={styles.list}>
          <Item
            name='battleship'
            description='A Battleship Game on Web with React.'
            icon='&#xe928;'
            repo='https://github.com/KelvinQiu802/battleship'
          />
          <Item
            name='kanban-react'
            description='A Kanban Web App Built with React.'
            icon='&#xe9cb;'
            repo='https://github.com/KelvinQiu802/kanban-react'
          />
          <Item
            name='micro-react'
            description='A micro React that implements React core concepts.'
            icon='&#xe64b;'
            repo='https://github.com/KelvinQiu802/micro-react'
          />
          <Item
            name='mini-redux'
            description='Use the most simple Javascript to implement Redux core functions.'
            icon='&#xe66c;'
            repo='https://github.com/KelvinQiu802/mini-redux'
          />
          <Item
            name='bookstore'
            description='A Book Searching Website using Google Book API.'
            icon='&#xe61f;'
            repo='https://github.com/KelvinQiu802/bookstore'
          />
          <Item
            name='your-cat'
            description='A website that will help you to choose the best breed of cat for you by asking you a few questions.'
            icon='&#xec8d;'
            repo='https://github.com/KelvinQiu802/your-cat'
          />
        </div>
        <p className={styles.title}>Demo</p>
        <div className={styles.list}>
          <Item
            name='163-music-downloader'
            description='A tampermonkey script to download 163 music.'
            icon='&#xe6b6;'
            repo='https://github.com/KelvinQiu802/163MusicDownloaderScript'
          />
          <Item
            name='dark-mode-toggle'
            description='A dark mode demo.'
            icon='&#xe65a;'
            repo='https://github.com/KelvinQiu802/dark-mode-toggle'
          />
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
};

export default Project;
