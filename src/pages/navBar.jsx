import React, { useState } from 'react';

import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import Logo from '../assets/img/zakodium.png';
import { routes } from './routes';
import useMedia from '../hooks/useMedia';
import NavBarItem from './navBarItem';

const NavBar = () => {
  const isSmallScreen = useMedia(['(max-width: 1023px)'], [true], false);
  const [menuVisibility, setMenuVisibility] = useState(false);

  const onMenuClick = (e) => setMenuVisibility(!menuVisibility);

  return (
    <header className="m-0 p-0 w-full lg:w-max lg:h-full bg-primary-dark">
      {/** Top NavBar in small screens*/}
      <div className="px-4 py-3 flex flex-row justify-between items-center lg:hidden ">
        <img src={Logo} alt="Logo" className="h-8" />
        <button
          type="button"
          className="block text-gray-300 hover:text-white focus:text-white focus:outline-none relative z-10"
          onClick={onMenuClick}
        >
          {menuVisibility ? (
            <CloseIcon className="fill-current h-5" />
          ) : (
            <MenuIcon className="fill-current h-5" />
          )}
        </button>
      </div>
      {/** NavBar*/}
      <nav
        className={
          menuVisibility || !isSmallScreen
            ? 'w-full lg:w-max px-4 pt-2 pb-4 flex flex-col justify-start flex-grow-0 relative z-10'
            : 'hidden'
        }
      >
        {!isSmallScreen && (
          <div className="w-full flex justify-center pt-2 pb-24">
            <img src={Logo} alt="Logo" width="150" />
          </div>
        )}
        <ul className="w-full">
          {routes.map((route) => (
            <NavBarItem
              key={route.label}
              route={route}
              subMenuVisibility={false}
            />
          ))}
        </ul>
      </nav>
      {/** exit navbar when click anywhere in the screen*/}
      {menuVisibility && (
        <button
          className="fixed inset-0 h-full w-full cursor-default focus:outline-none"
          tabIndex="-1"
        />
      )}
    </header>
  );
};

export default NavBar;
