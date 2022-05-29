import React from 'react';
import './experience.css';
import { BsPatchCheckFill } from 'react-icons/bs';

const frontend = [
  {
    id: 1,
    skill: 'HTML',
    experience: 'Experienced',
  },
  {
    id: 2,
    skill: 'CSS',
    experience: 'Experienced',
  },
  {
    id: 3,
    skill: 'SCSS',
    experience: 'Experienced',
  },
  {
    id: 4,
    skill: 'Javascript',
    experience: 'Experienced',
  },
  {
    id: 5,
    skill: 'React',
    experience: 'Experienced',
  },
  {
    id: 6,
    skill: 'Redux',
    experience: 'Experienced',
  },
  {
    id: 7,
    skill: 'Context',
    experience: 'Experienced',
  },
  {
    id: 8,
    skill: 'React Router',
    experience: 'Experienced',
  },
  {
    id: 9,
    skill: 'Material UI',
    experience: 'Experienced',
  },
  {
    id: 10,
    skill: 'Bootstrap',
    experience: 'Experienced',
  },
  {
    id: 11,
    skill: 'Tailwind CSS',
    experience: 'Intermediate',
  },
  {
    id: 12,
    skill: 'Styled Components',
    experience: 'Experienced',
  },
  {
    id: 13,
    skill: 'Emotion JS',
    experience: 'Experienced',
  },
  {
    id: 14,
    skill: 'Storybook',
    experience: 'Intermediate',
  },
  {
    id: 15,
    skill: 'DocZ',
    experience: 'Intermediate',
  },
  {
    id: 16,
    skill: 'Git',
    experience: 'Experienced',
  },
];

const backend = [
  {
    id: 1,
    skill: 'Node JS',
    experience: 'Basic',
  },
  {
    id: 2,
    skill: 'MySQL',
    experience: 'Basic',
  },
  {
    id: 3,
    skill: 'MongoDB',
    experience: 'Basic',
  },
];

const Experience = () => {
  return (
    <section id='experience'>
      <h5>What Skills I Have</h5>
      <h2>My Experience</h2>

      <div className='container experience__container'>
        <div className='experience__frontend'>
          <h3>Frontend Development</h3>
          <div className='experience__content'>
            {frontend.map(({ id, skill, experience }) => (
              <article key={id} className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon' />
                <div>
                  <h4>{skill}</h4>
                  <small className='text-light'>{experience}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
        {/* End of Frontend */}

        <div className='experience__backend'>
          <h3>Backend Development</h3>
          <div className='experience__content'>
            {backend.map(({ id, skill, experience }) => (
              <article key={id} className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon' />
                <div>
                  <h4>{skill}</h4>
                  <small className='text-light'>{experience}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
