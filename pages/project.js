import Wrapper from '../components/Wrapper';
import styles from '../styles/Project.module.css';
import Item from '../components/Project/Item';

const Project = () => {
  return (
    <Wrapper>
      <div className={styles.container}>
        <p className={styles.title}>Projects</p>
        <div className={styles.list}>
          <Item
            name='Battleship'
            description='A Battleship Game on Web with React.'
            icon='&#xe928;'
          />
          <Item
            name='Battleship'
            description='A Battleship Game on Web with React.'
            icon='&#xe928;'
          />
          <Item
            name='Battleship'
            description='A Battleship Game on Web with React.'
            icon='&#xe928;'
          />
        </div>
        <p className={styles.title}>Demo</p>
        <div className={styles.list}>
          <Item
            name='Battleship'
            description='A Battleship Game on Web with React.'
            icon='&#xe928;'
          />
          <Item
            name='Battleship'
            description='A Battleship Game on Web with React.'
            icon='&#xe928;'
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Project;
