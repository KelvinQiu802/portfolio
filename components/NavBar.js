import styles from '../styles/Nav.module.css';
import Link from 'next/link';

const NavBar = ({ setMode }) => {
  const handleClick = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    // toggle HTML theme
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={styles.container}>
      <Link href='/'>
        <a className={styles.signature}>Kelvin</a>
      </Link>
      <nav className={styles.nav}>
        {/* Mobile Icon */}
        <Link href='/blog'>
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
        <Link href='/blog'>
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
          rel='noreferrer'
          target='_blank'
          className={`iconfont ${styles.icon}`}
        >
          &#xe885;
        </a>
        <a
          href='https://space.bilibili.com/38563775'
          rel='noreferrer'
          target='_blank'
          className={`iconfont ${styles.icon}`}
        >
          &#xe66d;
        </a>
        <span className={`iconfont ${styles.icon}`} onClick={handleClick}>
          &#xe635;
        </span>
      </nav>
    </div>
  );
};

export default NavBar;
