import React, { useState } from 'react';

import './App.css';
import { FiTrash } from 'react-icons/fi';

import Landing from './components/Landing';
import TeamGenerator from './components/TeamGenerator';

function App() {
    const [showLanding, setShowLanding] = useState(true); // state to manage which card appears on screen
    const [showLikedNames, setShowLikedNames] = useState(false); // state to manage if the liked names should be shown
    const [likedNames, setLikedNames] = useState([]); // state to store the liked names
    const [isTransitioning, setIsTransitioning] = useState(false); // state to manage the transition between the landing and team generator cards

    // this function is called by the button inside the landing component to transition to the team generator card
    const transition = () => {
        setIsTransitioning(true); // set the transitioning state to true to trigger the fade-out animation
        setTimeout(() => {
            setShowLanding(false);
            setIsTransitioning(false);
        }, 300); // the transition duration is 300ms so that it matches the fade-out duration
    }

    // this function is called by the TeamGenerator component to send the value of the liked name to the parent component of App to save it in the likedNames array
    const handleLike = (name) => {
        setLikedNames([...likedNames, name]);
    }

    // this function is called by the span element to toggle the visibility of the liked names
    const toggleShowLikesNames = () => {
        setShowLikedNames(() => !showLikedNames);
    }

  return (
    <div className="App">
        <div className='liked-names-container'>
            <span className='show-names' onClick={toggleShowLikesNames}>
                {!showLikedNames ? "Show" : "Hide"} Liked Names
            </span>
            {
                // this conditionally renders the liked names list based on the showLikedNames state
                showLikedNames && (
                    <ul className='liked-names'>
                        {/* this maps through the likedNames array and displays the names in a list */}
                        {likedNames.map((name, index) => (
                            <li key={index}>
                                {name}
                                <FiTrash className='delete-icon' size={15} onClick={() => setLikedNames(likedNames.filter((_, i) => i !== index))} />
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
        <div className={`main-card`}>
            {/*This conditionally renders one of the cards */}
            {showLanding ? (
                <div className={`fade-in ${isTransitioning ? 'fade-out' : ''}`}>
                    <Landing handleClick={transition} />
                </div>
            ) : (
                <div className={`fade-in`}>
                    <TeamGenerator handleLike={handleLike}/>
                </div>
            )}
        </div>
    </div>
  );
}

export default App;
