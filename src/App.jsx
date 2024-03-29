import React from 'react';

import { NavBar } from './components';
import AppContent from './pages/AppContent';

function App() {
  return (
    <div className="w-screen h-screen flex overflow-hidden flex-col lg:flex-row">
      <NavBar />
      <div className="w-full h-full overflow-scroll bg-gray-50">
        <AppContent />
      </div>
    </div>
  );
}

export default App;
