import React from 'react';
import './portfolio.css';
import IMG1 from '../../assets/portfolio1.png';
import IMG2 from '../../assets/portfolio2.png';
import IMG3 from '../../assets/portfolio3.png';
import IMG4 from '../../assets/portfolio4.png';
import IMG5 from '../../assets/portfolio5.png';
import IMG6 from '../../assets/portfolio6.jpg';

// Do not use the img in production
const data = [
  {
    id: 1,
    image: IMG1,
    title: 'Natours Tour',
    github: 'https://github.com/mdraselswe/Natours-Tour',
    demo: 'https://mdraselswe.github.io/Natours-Tour/',
  },
  {
    id: 2,
    image: IMG2,
    title: 'React Hooks Todo App',
    github: 'https://github.com/mdraselswe/React-Hoocks-TodoApp',
    demo: 'https://wonderful-fermi-c52267.netlify.com/',
  },
  {
    id: 3,
    image: IMG3,
    title: 'The Movie DB',
    github: 'https://github.com/mdraselswe/The-Movie-DB',
    demo: 'https://cocky-hermann-09e9ce.netlify.app/',
  },
  {
    id: 4,
    image: IMG4,
    title: 'Footylight',
    github: '#',
    demo: 'https://www.footylight.com/',
  },
  {
    id: 5,
    image: IMG5,
    title: 'Crwn Clothing',
    github: 'https://github.com/mdraselswe/crwn-clothing',
    demo: 'https://crwn-clothing-rasel.herokuapp.com/',
  },
  {
    id: 6,
    image: IMG6,
    title: 'Money Management App',
    github: 'https://github.com/mdraselswe/money-management-app',
    demo: '#',
  },
];

const Portfolio = () => {
  return (
    <section id='portfolio'>
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className='container portfolio__container'>
        {data.map(({ id, image, title, github, demo }) => {
          return (
            <article key={id} className='portfolio__item'>
              <div className='portfolio__item-image'>
                <img src={image} alt={title} />
              </div>
              <h3>{title}</h3>
              <div className='portfolio__item-cta'>
                {github !== '#' && (
                  <a href={github} className='btn' target='_blank' rel="noreferrer">
                    Github
                  </a>
                )}
                {demo !== '#' && (
                  <a href={demo} className='btn btn-primary' target='_blank' rel="noreferrer">
                    Live Demo
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;
