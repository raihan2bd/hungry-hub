import React from 'react';

import Header from './component/Layout/Header';
import Meals from './component/Meals/Meals';

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;
