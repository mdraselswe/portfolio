import React from 'react';
import CV from '../../assets/cv.pdf';

const CTA = () => {
  return (
    <div className='cta'>
      <a href='https://drive.google.com/file/d/1O-evEvIh_YVc_BHmtL_JCsfke3Hbw7Tn/view?usp=sharing' target="_blank" download className='btn'>
        Download CV
      </a>
      <a href='#contact' className='btn btn-primary'>
        Let's Talk
      </a>
    </div>
  );
};

export default CTA;
