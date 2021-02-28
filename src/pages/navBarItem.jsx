import React, { useState } from 'react';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-down.svg';

const NavBarItem = ({ route }) => {
  const [isOpen, setIsOpen] = useState(false);
  const subMenuEnable = route.subMenu;
  return (
    <li className="w-full flex flex-col">
      <div
        className="w-full h-12 sm:px-2 flex flex-row justify-start items-center rounded group cursor-pointer hover:bg-gray-500 hover:bg-opacity-10 "
        onClick={() => subMenuEnable && setIsOpen(!isOpen)}
      >
        {route.icon({
          className:
            'pl-2 pr-4 fill-current text-gray-300 group-hover:text-gray-100',
          height: '20',
        })}
        <span className="font-sans font-light text-md text-gray-300 group-hover:font-normal group-hover:text-gray-100 ">
          {route.label}
        </span>
        {subMenuEnable && (
          <div className="flex flex-1 justify-end px-4 lg:pr-0">
            <ArrowIcon
              className="fill-current text-gray-300 hover:text-gray-100"
              height="15"
            />
          </div>
        )}
      </div>

      {subMenuEnable && isOpen && (
        <div className="w-full flex flex-col">
          {route.subMenu.map((subMenu) => (
            <div
              key={subMenu.label}
              className="w-full h-10 pl-12 sm:pl-16 lg:pl-8 flex justify-start items-center rounded group cursor-pointer hover:bg-gray-500 hover:bg-opacity-10"
            >
              <span className="font-sans font-light text-md text-gray-300 group-hover:font-normal group-hover:text-gray-100 ">
                {subMenu.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </li>
  );
};

export default NavBarItem;
