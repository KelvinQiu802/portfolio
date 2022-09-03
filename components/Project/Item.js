import styles from '../../styles/Project.module.css';

const Item = ({ name, description, icon, repo }) => {
  return (
    <a href={repo} rel='noreferrer' target='_blank'>
      <div className={styles.item}>
        <span className={`iconfont ${styles.icon}`}>{icon}</span>
        <div className={styles.info}>
          <p className={styles.name}>{name}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </a>
  );
};

export default Item;
