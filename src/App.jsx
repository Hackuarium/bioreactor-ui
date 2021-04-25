import React from 'react';

import NavBar from './components/navBar';
import AppContent from './pages/appContent';

function App() {
  
  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row">
      <NavBar />
      <div className="w-full h-full bg-gray-50">
        <AppContent />
      </div>
    </div>
  );
}

export default App;
