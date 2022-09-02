import Link from 'next/link';
import styles from '../styles/Cd.module.css';

const Cd = () => {
  return (
    <div className={styles.cd}>
      <Link href='/blog'>
        <a className={styles.link}>cd..</a>
      </Link>
    </div>
  );
};

export default Cd;
