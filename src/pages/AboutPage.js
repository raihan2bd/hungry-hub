import backgroundImage from '../assets/food-wallpaper.jpg';
import classes from './AboutPage.module.css';

const AboutPage = () => {
  return (
    <section className={classes.about_page_section} style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className={classes.container}>
        <h2 className={classes.title}>About Us</h2>
        <div className={classes.card}>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, eos dolor nulla reprehenderit earum recusandae consequuntur corporis libero voluptate itaque vero ratione unde amet tempora aliquid assumenda dolore? Numquam, illo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa vero recusandae dicta ipsum eveniet deserunt vel iure praesentium? Officiis odit, suscipit fugiat rerum neque natus consequuntur eius aspernatur cumque cum.</p>
        </div>
        <div className={classes.card}>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, eos dolor nulla reprehenderit earum recusandae consequuntur corporis libero voluptate itaque vero ratione unde amet tempora aliquid assumenda dolore? Numquam, illo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa vero recusandae dicta ipsum eveniet deserunt vel iure praesentium? Officiis odit, suscipit fugiat rerum neque natus consequuntur eius aspernatur cumque cum.</p>
        </div>
        <div className={classes.card}>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, eos dolor nulla reprehenderit earum recusandae consequuntur corporis libero voluptate itaque vero ratione unde amet tempora aliquid assumenda dolore? Numquam, illo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa vero recusandae dicta ipsum eveniet deserunt vel iure praesentium? Officiis odit, suscipit fugiat rerum neque natus consequuntur eius aspernatur cumque cum.</p>
        </div>
      </div>
    </section>
  )
}

export default AboutPage;