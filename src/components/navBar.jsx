import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import useMedia from '../hooks/useMedia';
import { routes, getCurrentRoute } from '../navigation/routeHelper';
import {
  SvgOutlineMenu,
  SvgOutlineX,
  VerticalNavigation,
  ZakodiumSolidSvg,
} from './tailwind-ui';

// Helper func: get only routes which has inNavbar=true
const getNavbarOptions = (routes, onClick) =>
  routes.reduce((routeList, route) => {
    if (route.inNavbar) {
      const { id, label, value, icon } = route;
      const renderOption =
        route.component || route.render
          ? (children, option) => (
              <NavLink to={option.value} exact onClick={onClick}>
                {children}
              </NavLink>
            )
          : undefined;

      const options = route.options //if route has sub routes (options)
        ? getNavbarOptions(route.options)
        : [];

      routeList.push({
        type: options.length > 0 ? 'group' : 'option',
        id,
        label,
        value,
        icon,
        renderOption,
        options,
      });
    }
    return routeList;
  }, []);

//
// Navbar Component

const NavBar = () => {
  const isSmallScreen = useMedia(['(max-width: 1023px)'], [true], false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(getCurrentRoute(routes));

  const onCloseMenu = (e) => setIsOpen(false);

  const navbarOptions = getNavbarOptions(routes, onCloseMenu);

  return (
    <header className="m-0 p-0 w-full lg:w-max lg:h-full relative bg-primary-900">
      {/** Top NavBar in small screens*/}
      <div className="px-4 py-3 flex flex-row justify-between items-center lg:hidden">
        <ZakodiumSolidSvg className="fill-current text-white h-6" />
        <button
          type="button"
          className="block focus:outline-none relative z-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <SvgOutlineX className="text-gray-300 hover:text-white focus:text-white h-6 w-6" />
          ) : (
            <SvgOutlineMenu className="text-gray-300 hover:text-white focus:text-white h-6 w-6" />
          )}
        </button>
      </div>

      {/** NavBar*/}
      <nav
        className={
          //hide navbar by default for small screens
          isOpen || !isSmallScreen
            ? 'w-full lg:w-60 px-6 lg:px-2 pt-2 pb-4 flex flex-col justify-start flex-grow-0 absolute z-10 top-auto lg:static bg-primary-900'
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
          options={navbarOptions}
        />
      </nav>

      {/** on small screens: exit navbar when clicking anywhere in the screen*/}
      {isSmallScreen && isOpen && (
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
