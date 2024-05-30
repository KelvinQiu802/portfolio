import {
  Atom,
  AudioLines,
  Cat,
  Cpu,
  Ghost,
  Grip,
  LibraryBig,
  ListTodo,
  MountainSnow,
  PawPrint,
  Radiation,
  Receipt,
  Rss,
  Ship,
  User,
} from 'lucide-react';
import Head from 'next/head';
import Footer from '../components/Footer';
import Item from '../components/Project/Item';
import Wrapper from '../components/Wrapper';
import styles from '../styles/Project.module.css';

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
            name='bjut-cat'
            description='A Wechat mini program for BJUT cats.'
            repo='https://github.com/KelvinQiu802/bjut-cats'
          >
            <Cat className={styles.icon} />
          </Item>
          <Item
            name='landscape'
            description='A pomodoro timer with video background.'
            repo='https://github.com/KelvinQiu802/landscape'
          >
            <MountainSnow className={styles.icon} />
          </Item>
          <Item
            name='battleship'
            description='A Battleship Game on Web with React.'
            repo='https://github.com/KelvinQiu802/battleship'
          >
            <Ship className={styles.icon} />
          </Item>
          <Item
            name='kanban-react'
            description='A Kanban Web App Built with React.'
            repo='https://github.com/KelvinQiu802/kanban-react'
          >
            <ListTodo className={styles.icon} />
          </Item>
          <Item
            name='monopoly-java'
            description='A command line monopoly game written in Java.'
            repo='https://github.com/KelvinQiu802/monopoly'
          >
            <Receipt className={styles.icon} />
          </Item>
          <Item
            name='pacman-java'
            description='A GUI pacman game written in Java.'
            repo='https://github.com/KelvinQiu802/pacman'
          >
            <Ghost className={styles.icon} />
          </Item>
          <Item
            name='tiny-compiler'
            description='A super tiny compiler (only 200 lines) and tutorial.'
            repo='https://github.com/KelvinQiu802/tiny-compiler'
          >
            <Cpu className={styles.icon} />
          </Item>
          <Item
            name='my-portfolio'
            description='This website.'
            repo='https://github.com/KelvinQiu802/portfolio'
          >
            <User className={styles.icon} />
          </Item>
          <Item
            name='bookstore'
            description='A Book Searching Website using Google Book API.'
            repo='https://github.com/KelvinQiu802/bookstore'
          >
            <LibraryBig className={styles.icon} />
          </Item>
          <Item
            name='your-cat'
            description='Choose the best breed of cat for you by asking you a few questions.'
            repo='https://github.com/KelvinQiu802/your-cat'
          >
            <PawPrint className={styles.icon} />
          </Item>
        </div>
        <p className={styles.title}>Tools</p>
        <div className={styles.list}>
          <Item
            name='hackernews-cli-tool'
            description='A Hacker News CLI tool.'
            repo='https://github.com/KelvinQiu802/hackernews-cli-tool'
          >
            <Rss className={styles.icon} />
          </Item>
          <Item
            name='163-music-downloader'
            description='A tampermonkey script to download 163 music.'
            repo='https://github.com/KelvinQiu802/163MusicDownloaderScript'
          >
            <AudioLines className={styles.icon} />
          </Item>
        </div>
        <p className={styles.title}>Demo</p>
        <div className={styles.list}>
          <Item
            name='micro-react'
            description='A micro React that implements React core concepts.'
            repo='https://github.com/KelvinQiu802/micro-react'
          >
            <Atom className={styles.icon} />
          </Item>
          <Item
            name='mini-redux'
            description='Use the most simple Javascript to implement Redux core functions.'
            repo='https://github.com/KelvinQiu802/mini-redux'
          >
            <Radiation className={styles.icon} />
          </Item>
          <Item
            name='react-dnd-playground'
            description='React drag and drop examples playground.'
            repo='https://github.com/KelvinQiu802/react-dnd-playground'
          >
            <Grip className={styles.icon} />
          </Item>
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
};

export default Project;
