import React, { useState } from 'react';

import './App.css';
import Landing from './components/Landing';
import TeamGenerator from './components/TeamGenerator';

function App() {
    const [showLanding, setShowLanding] = useState(true);
    
    const transition = () => {
        setShowLanding(false);
    }

  return (
    <div className="App">
        {showLanding ? (
            <div className='fade-in'>
                <Landing handleClick={transition} />
            </div>
        ) : (
            <div className='fade-in'>
                <TeamGenerator />
            </div>
        )}
    </div>
  );
}

export default App;
