import styles from '../styles/Nav.module.css';
import Link from 'next/link';

const NavBar = () => {
  return (
    <div className={styles.container}>
      <span className={styles.signature}>Kelvin</span>
      <nav className={styles.nav}>
        <Link href='/'>
          <a className={styles.link}>Blog</a>
        </Link>
        <Link href='/'>
          <a className={styles.link}>Projects</a>
        </Link>
        <Link href='/'>
          <a className={styles.link}>Videos</a>
        </Link>
        <Link href='/'>
          <span className={`iconfont ${styles.icon}`}>&#xe885;</span>
        </Link>
        <Link href='/'>
          <span className={`iconfont ${styles.icon}`}>&#xe66d;</span>
        </Link>
        <Link href='/'>
          <span className={`iconfont ${styles.icon}`}>&#xe635;</span>
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
