import React, { useState } from 'react';

import useMedia from '../hooks/useMedia';
import { ZakodiumSolidSvg } from './tailwind-ui/logos/Zakodium';
import { VerticalNavigation } from './tailwind-ui/navigation/VerticalNavigation';
import { NavLink } from 'react-router-dom';
import { SvgOutlineMenu, SvgOutlineX } from './tailwind-ui';

const NavBar = ({ routes }) => {
  const isSmallScreen = useMedia(['(max-width: 1023px)'], [true], false);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [selected, setSelected] = useState();

  const onMenuClick = (e) => setMenuVisibility(!menuVisibility);
  const onCloseMenu = (e) => setMenuVisibility(false);

  const getRoutes = (routes) =>
    routes.map((route) => {
      const navigationType = route.options ? 'group' : 'option';
      const navigation = {
        type: navigationType,
        id: route.id,
        label: route.label,
        value: route.path,
        icon: route.icon,
      };
      if (navigationType === 'option') {
        return {
          ...navigation,
          renderOption: (children, option) => (
            <NavLink to={option.value} exact onClick={onCloseMenu}>
              {children}
            </NavLink>
          ),
        };
      } else {
        return { ...navigation, options: getRoutes(route.options) };
      }
    });

  return (
    <header className="m-0 p-0 w-full lg:w-max lg:h-full relative bg-primary-dark">
      {/** Top NavBar in small screens*/}
      <div className="px-4 py-3 flex flex-row justify-between items-center lg:hidden">
        <ZakodiumSolidSvg className="fill-current text-white h-6" />
        <button
          type="button"
          className="block focus:outline-none relative z-10"
          onClick={onMenuClick}
        >
          {menuVisibility ? (
            <SvgOutlineX
              className="text-gray-300 hover:text-white focus:text-white"
              width="1.5em"
              height="1.5em"
            />
          ) : (
            <SvgOutlineMenu
              className="text-gray-300 hover:text-white focus:text-white"
              width="1.5em"
              height="1.5em"
            />
          )}
        </button>
      </div>

      {/** NavBar*/}
      <nav
        className={
          //hide navbar by default for small screens
          menuVisibility || !isSmallScreen
            ? 'w-full lg:w-60 px-6 lg:px-2 pt-2 pb-4 flex flex-col justify-start flex-grow-0 absolute z-10 top-auto lg:static bg-primary-dark'
            : 'hidden'
        }
      >
        {!isSmallScreen && (
          <div className="w-full flex justify-center pt-2 pb-24 px-4">
            <ZakodiumSolidSvg className="w-44 fill-current text-white" />
          </div>
        )}
        <VerticalNavigation
          onSelect={setSelected}
          selected={selected}
          options={getRoutes(routes)}
        />
      </nav>

      {/** on small screens: exit navbar when clicking anywhere in the screen*/}
      {isSmallScreen && menuVisibility && (
        <button
          className="fixed inset-0 h-full w-full cursor-default focus:outline-none"
          tabIndex="-1"
          onClick={onCloseMenu}
        />
      )}
    </header>
  );
};

export default NavBar;
