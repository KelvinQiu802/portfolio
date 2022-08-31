import styles from '../styles/Wrapper.module.css';

const Wrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Wrapper;
