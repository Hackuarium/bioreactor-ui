import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-down.svg';

const NavBarItem = ({ route }) => {
  const [isOpen, setIsOpen] = useState(false);
  const subMenuEnabled = route.subRoute;
  const currentPath = useLocation();
  const activeClassNames = 'bg-gray-400 bg-opacity-10';

  return (
    <li className="w-full flex flex-col">
      <NavLink
        to={
          route.subRoute
            ? '#'
            : route.path /*prevent navigation when it has a submenu*/
        }
        exact
        activeClassName={route.subRoute ? '' : activeClassNames}
        className="w-full h-12 sm:px-2 flex flex-row justify-start items-center rounded group cursor-pointer hover:bg-gray-500 hover:bg-opacity-10 "
        onClick={() => subMenuEnabled && setIsOpen(!isOpen)}
      >
        {route.icon({
          className:
            'pl-2 pr-4 fill-current text-gray-300 group-hover:text-gray-100',
          height: '20',
        })}
        <span className="font-sans font-light text-md text-gray-300 group-hover:font-normal group-hover:text-gray-100 ">
          {route.label}
        </span>
        {subMenuEnabled && (
          <div className="flex flex-1 justify-end px-4 lg:pr-0">
            <ArrowIcon
              className="fill-current text-gray-300 hover:text-gray-100"
              height="15"
            />
          </div>
        )}
      </NavLink>

      {subMenuEnabled && (
        <div className="w-full flex flex-col">
          {route.subRoute.map((subRoute) => {
            /**Open subMenu when subRoute is active*/
            if (!isOpen && currentPath.pathname === route.path + subRoute.path)
              setIsOpen(true);

            return (
              isOpen && (
                <NavLink
                  key={subRoute.label}
                  to={route.path + subRoute.path}
                  exact
                  activeClassName={activeClassNames}
                  className="w-full h-10 pl-12 sm:pl-16 lg:pl-8 flex justify-start items-center rounded group cursor-pointer hover:bg-gray-500 hover:bg-opacity-10"
                >
                  <span className="font-sans font-light text-md text-gray-300 group-hover:font-normal group-hover:text-gray-100 ">
                    {subRoute.label}
                  </span>
                </NavLink>
              )
            );
          })}
        </div>
      )}
    </li>
  );
};

export default NavBarItem;
