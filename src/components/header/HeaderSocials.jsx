import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub, FaFacebook } from 'react-icons/fa';

const HeaderSocials = () => {
  return (
    <div className='header__socials'>
      <a href='https://www.linkedin.com/in/mdraselswe/' target='_blank'>
        <BsLinkedin />
      </a>
      <a href='https://github.com/mdraselswe' target='_blank'>
        <FaGithub />
      </a>
      <a href='https://www.facebook.com/MdRaselSWE/' target='_blank'>
        <FaFacebook />
      </a>
    </div>
  );
};

export default HeaderSocials;
