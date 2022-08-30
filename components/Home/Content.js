import utilStyls from '../../styles/util.module.css';
import styls from '../../styles/Content.module.css';
import Divider from '../Divider';

const Content = () => {
  return (
    <div className={`${styls.content} ${utilStyls.plain}`}>
      <article>
        <p>
          Hi, I'm Kelvin, a sophomore at{' '}
          <span className={utilStyls.stress}>
            Beijing University of Technology
          </span>
          , majoring in{' '}
          <span className={utilStyls.stress}>Software Engineering</span>.{' '}
        </p>
        <p>
          The current focus is on the{' '}
          <span className={utilStyls.stress}>front-end</span>, based on{' '}
          <span className={utilStyls.stress}>React</span> ecosystem.
        </p>
        <p>
          I love <span className={utilStyls.stress}>cats</span>, but allergic to
          cats. 🐈
        </p>
      </article>
      <Divider />
      <article>
        <p>
          I enjoy programming. Playing around with code, discovering new tech,
          and building fun and useful projects are my favorite. On the projects
          page, I will show you all of my projects with a Github repository and
          an online demo.{' '}
        </p>
        <p>Some of my projects: Battleship | mini-react | Kanban | YourCat</p>
      </article>
      <Divider />
      <article>
        <p>
          In my spare time, I like creating videos about programming. Not just
          tutorial, but also share some opinions and experience. You can find me
          on 哔哩哔哩 by searching Dragonfly_Y or clicking this link.
        </p>
      </article>
      <Divider />
      <article>
        <p>Find me on Github and 哔哩哔哩</p>
        <p>Mail me at kelvinqiu802@outlook.com</p>
      </article>
    </div>
  );
};

export default Content;
