import styles from '../styles/Nav.module.css';
import Link from 'next/link';

const NavBar = () => {
  return (
    <div className={styles.container}>
      <span className={styles.signature}>Kelvin</span>
      <nav className={styles.nav}>
        {/* Mobile Icon */}
        <Link href='/'>
          <span className={`iconfont ${styles.mobile} ${styles.icon}`}>
            &#xe634;
          </span>
        </Link>
        <Link href='/'>
          <span className={`iconfont ${styles.mobile} ${styles.icon}`}>
            &#xe650;
          </span>
        </Link>
        <Link href='/'>
          <span className={`iconfont ${styles.mobile} ${styles.icon}`}>
            &#xe54d;
          </span>
        </Link>

        {/* Laptop Link */}
        <Link href='/'>
          <a className={`${styles.link} ${styles.laptop}`}>Blog</a>
        </Link>
        <Link href='/'>
          <a className={`${styles.link} ${styles.laptop}`}>Projects</a>
        </Link>
        <Link href='/'>
          <a className={`${styles.link} ${styles.laptop}`}>Videos</a>
        </Link>

        {/* Other Icon */}
        <a
          href='https://github.com/kelvinqiu802'
          target='_blank'
          className={`iconfont ${styles.icon}`}
        >
          &#xe885;
        </a>
        <a
          href='https://space.bilibili.com/38563775'
          target='_blank'
          className={`iconfont ${styles.icon}`}
        >
          &#xe66d;
        </a>
        <span className={`iconfont ${styles.icon}`}>&#xe635;</span>
      </nav>
    </div>
  );
};

export default NavBar;
