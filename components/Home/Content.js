import Link from 'next/link';
import styls from '../../styles/Content.module.css';
import utilStyles from '../../styles/util.module.css';
import Divider from '../Divider';

const Content = () => {
  return (
    <div className={`${styls.content} ${utilStyles.plain}`}>
      <article>
        <p>
          Hi, I&apos;m Kelvin, a student at{' '}
          <span className={utilStyles.stress}>
            Beijing University of Technology
          </span>
          , majoring in{' '}
          <span className={utilStyles.stress}>Software Engineering</span>.{' '}
        </p>
        <p>
          I love <span className={utilStyles.stress}>cats</span>, but allergic
          to cats. 🐈
        </p>
      </article>
      <Divider />
      <article>
        <p>
          I enjoy programming. Playing around with code, discovering new tech,
          and building fun and useful projects are my favorite. On the{' '}
          <Link href='/'>
            <a className={utilStyles.textLink}>projects</a>
          </Link>{' '}
          projects page, I will show you my projects with a{' '}
          <a
            href='https://github.com/kelvinqiu802'
            className={utilStyles.textLink}
            rel='noreferrer'
            target='_blank'
          >
            Github
          </a>{' '}
          repository and an online demo.{' '}
        </p>
      </article>
      <Divider />
      <article>
        <p>
          In my spare time, I like creating videos about programming. Not just
          tutorial, but also share some opinions and experience. You can find me
          on <span className={utilStyles.stress}>哔哩哔哩</span> by searching
          MiuMiu8802 or clicking{' '}
          <a
            href='https://space.bilibili.com/38563775'
            rel='noreferrer'
            target='_blank'
            className={utilStyles.textLink}
          >
            this link
          </a>
          .
        </p>
      </article>
      <Divider />
      <article>
        <p>
          Find me on{' '}
          <a
            href='https://github.com/kelvinqiu802'
            rel='noreferrer'
            target='_blank'
            className={utilStyles.textLink}
          >
            Github
          </a>{' '}
          and{' '}
          <a
            href='https://space.bilibili.com/38563775'
            rel='noreferrer'
            target='_blank'
            className={utilStyles.textLink}
          >
            哔哩哔哩
          </a>
          .
        </p>
        <p>
          Mail me at{' '}
          <a
            href='mailto:kelvinqiu802@outlook.com'
            rel='noreferrer'
            target='_blank'
            className={utilStyles.textLink}
          >
            kelvinqiu802@outlook.com
          </a>
          .
        </p>
      </article>
    </div>
  );
};

export default Content;
