import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p className={styles.cc}>
        <a
          href='https://creativecommons.org/licenses/by-nc-sa/4.0/'
          rel='noreferrer'
          target='_blank'
        >
          CC BY-NC-SA 4.0
        </a>{' '}
        © Yang Qiu
      </p>
      <a href='https://beian.miit.gov.cn/' rel='noreferrer' target='_blank'>
        京ICP备2022001803号
      </a>
    </div>
  );
};

export default Footer;
