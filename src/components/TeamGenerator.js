import React, { useState } from 'react';

import { FiHeart } from 'react-icons/fi';
import { ADJECTIVES, MOVIES, VOWELSUFFIXES, CONSONANTSUFFIXES, PREFIXES, VOWELS } from '../constants/constants';

export default function TeamGenerator() {
    const [userInput, setUserInput] = useState('');
    const [generatedNames, setGeneratedNames] = useState([]);

    const handleChange = (e) => {
        setUserInput(e.target.value);
    }

    const handleGenerate = () => {
        const randomAdjectiveName = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)] + ' ' + userInput;
        const randomMovieTitleName = MOVIES[Math.floor(Math.random() * MOVIES.length)].replace('$', userInput);
        console.log(randomMovieTitleName);
        const randomPrefixName = PREFIXES[Math.floor(Math.random() * PREFIXES.length)] + ' ' + userInput;
        const randomVowelName = userInput.replace(/[aeiou]/gi, VOWELS[Math.floor(Math.random() * VOWELS.length)]);

        const lastLetter = userInput[userInput.length - 1];

        var randomSuffixName = '';

        if (VOWELS.includes(lastLetter)) {
            randomSuffixName = userInput + VOWELSUFFIXES[Math.floor(Math.random() * VOWELSUFFIXES.length)];
        } else {
            randomSuffixName = userInput + CONSONANTSUFFIXES[Math.floor(Math.random() * CONSONANTSUFFIXES.length)];
        }

        setGeneratedNames([randomAdjectiveName, randomMovieTitleName, randomPrefixName, randomVowelName, randomSuffixName]);
    }

    return (
        <div className="page">
            <div className="team-generator-card">
                <div className="left-side">
                    <h1>Type a keyword</h1>
                    <div className="input-button">
                        <input type="text" name="keyword" placeholder="E.g. a sport, fruit, industry, car brand, anything really!" className="keyword-input" onChange={handleChange}/>
                        <button className="generate-btn" onClick={handleGenerate}>Generate</button>
                    </div>
                    <p className="random-generation-label">Don't feel like it?</p>
                    <button className="generate-btn">Generate Randomly</button>
                </div>
                <div className='right-side'>
                    {generatedNames.length > 0 ? (
                        <ul className="generated-names">
                            {generatedNames.map((name, index) => (
                                <li>
                                    <span>{name}</span>
                                    <button className="like-btn"></button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                    <div className="description">
                        The generated names will appear here
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}
