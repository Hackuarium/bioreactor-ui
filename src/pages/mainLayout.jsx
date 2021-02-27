import React from 'react';
import NavBar from './navBar';

const MainLayout = () => {
  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row">
      <NavBar />
      <div className="w-full h-full bg-gray-100"></div>
    </div>
  );
};

export default MainLayout;
