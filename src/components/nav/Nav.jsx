import React, { useState } from 'react';
import './nav.css';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { BiBook } from 'react-icons/bi';
import { RiServiceLine } from 'react-icons/ri';
import { BiMessageSquareDetail } from 'react-icons/bi';

const Nav = () => {
  const [activeNow, setActiveNow] = useState('#');

  return (
    <nav>
      <a
        href='#'
        onClick={() => setActiveNow('#')}
        className={activeNow === '#' ? 'active' : ''}
        title='Home'
      >
        <AiOutlineHome />
      </a>
      <a
        href='#about'
        onClick={() => setActiveNow('#about')}
        className={activeNow === '#about' ? 'active' : ''}
        title='About'
      >
        <AiOutlineUser />
      </a>
      <a
        href='#experience'
        onClick={() => setActiveNow('#experience')}
        className={activeNow === '#experience' ? 'active' : ''}
        title='Experience'
      >
        <BiBook />
      </a>
      <a
        href='#portfolio'
        onClick={() => setActiveNow('#portfolio')}
        className={activeNow === '#portfolio' ? 'active' : ''}
        title='Portfolio'
      >
        <RiServiceLine />
      </a>
      <a
        href='#contact'
        onClick={() => setActiveNow('#contact')}
        className={activeNow === '#contact' ? 'active' : ''}
        title='Contact'
      >
        <BiMessageSquareDetail />
      </a>
    </nav>
  );
};

export default Nav;
