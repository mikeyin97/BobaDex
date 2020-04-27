import React from 'react';

import Header from './components/Header';
import SearchTable from './components/SearchTable';
import './public/stylesheets/App.css';

const App = () => {
  return (
    <div className = "App">
      <div className="Header">
        <Header />
      </div>
      <div className="SearchTable">
        <SearchTable />
      </div>
    </div>
  );
}

export default App;