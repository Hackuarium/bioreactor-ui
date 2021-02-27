import React, { useState } from 'react';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-down.svg';

const NavBarItem = ({ route }) => {
  const [isOpen, setIsOpen] = useState(false);
  const subMenuEnable = route.subMenu;
  return (
    <li className="w-full flex flex-col">
      <div
        className="w-full h-12 px-4 sm:px-12 lg:px-2 flex flex-row justify-start items-center group cursor-pointer hover:bg-gray-500 hover:bg-opacity-10 "
        onClick={() => subMenuEnable && setIsOpen(!isOpen)}
      >
        {route.icon({
          className:
            'px-4 fill-current text-gray-300 group-hover:text-gray-100',
          height: '20',
        })}
        <span className="font-sans font-light text-md text-gray-300 group-hover:font-normal group-hover:text-gray-100 ">
          {route.label}
        </span>
        {subMenuEnable && (
          <div className="flex flex-1 justify-end px-6 lg:px-4">
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
              className="w-full h-8 px-20 sm:px-28 lg:px-12 flex justify-start items-center group cursor-pointer hover:bg-gray-500 hover:bg-opacity-10"
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
