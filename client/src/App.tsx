import React from 'react';
import Board from 'components/Board';
import { SpotsContext } from 'context/SpotsContext';
import { useSpots } from 'hooks/useSpots';

function App() {
  const spots = useSpots();

  return (
    <SpotsContext.Provider value={spots}>
      <Board />
    </SpotsContext.Provider>
  );
}

export default App;
