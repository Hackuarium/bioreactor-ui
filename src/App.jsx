import React from 'react';
import NavBar from './components/navBar';
import routes from './pages/routes';
import AppContent from './pages/appContent';

function App() {
  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row">
      <NavBar routes={routes} />
      <div className="w-full h-full bg-gray-50">
        <AppContent routes={routes} />
      </div>
    </div>
  );
}

export default App;
