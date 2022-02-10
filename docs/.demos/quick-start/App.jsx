import React from 'react';
import { Nuomi } from '@nuomi';
import list from './list';
import List from './List.jsx';

function App() {
  return (
    <Nuomi {...list}>
      <List />
    </Nuomi>
  );
}

export default App;
