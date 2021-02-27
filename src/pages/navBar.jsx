import React, { useState } from 'react';

import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import Logo from '../assets/img/zakodium.png';
import { routes } from './routes';
import useMedia from '../hooks/useMedia';
import NavBarItem from './navBarItem';

const NavBar = () => {
  const isMobile = useMedia(['(max-width: 1023px)'], [true], false);
  const [menuVisibility, setMenuVisibility] = useState(false);

  const onMenuClick = (e) => setMenuVisibility(!menuVisibility);

  return (
    <nav className="m-0 p-0 w-full lg:w-max lg:h-full bg-primary-dark">
      {/** Top NavBar in small screens*/}
      <div
        className="p-2 flex flex-row justify-between items-center lg:hidden h-max"
        onClick={onMenuClick}
      >
        <img src={Logo} alt="Logo" width="150" className="py-1 mx-4" />
        {menuVisibility ? (
          <CloseIcon
            className="px-2 fill-current text-gray-300 cursor-pointer"
            height="20"
          />
        ) : (
          <MenuIcon
            className="px-2 fill-current text-gray-300 cursor-pointer"
            height="20"
          />
        )}
      </div>
      {/** Left NavBar*/}
      <div
        className={
          menuVisibility || !isMobile
            ? 'flex flex-col justify-start flex-grow-0 w-full h-max lg:w-max'
            : 'hidden'
        }
      >
        {!isMobile && (
          <div className="w-full flex justify-center px-12 pt-4 pb-24">
            <img src={Logo} alt="Logo" width="150" />
          </div>
        )}
        <ul className="w-full">
          {routes.map((route) => (
            <NavBarItem key={route.label} route={route} />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
