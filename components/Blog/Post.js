import styles from '../../styles/Post.module.css';
import Link from 'next/link';

const Post = ({ title, date }) => {
  return (
    <Link href='/blog'>
      <div className={styles.post}>
        <p className={styles.title}>{title}</p>
        <p className={styles.date}>{date}</p>
      </div>
    </Link>
  );
};

export default Post;
