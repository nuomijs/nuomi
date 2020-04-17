import React from 'react';
import { Nuomi } from '@nuomi';
import list from './list';
import List from './List';

function App() {
  return (
    <Nuomi {...list}>
      <List />
    </Nuomi>
  );
}

export default App;
