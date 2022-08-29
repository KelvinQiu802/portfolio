import styles from '../styles/Nav.module.css';
import Link from 'next/link';

const NavBar = () => {
  return (
    <div className={styles.container}>
      <span className={styles.signature}>Kelvin</span>
      <nav className={styles.nav}>
        <Link href='/'>
          <a>Blog</a>
        </Link>
        <Link href='/'>
          <a>Projects</a>
        </Link>
        <Link href='/'>
          <a>Videos</a>
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
