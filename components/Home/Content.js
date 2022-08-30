import utilStyls from '../../styles/util.module.css';
import styls from '../../styles/Content.module.css';

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
    </div>
  );
};

export default Content;
