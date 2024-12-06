import React, { useState } from 'react';

import { FiHeart } from 'react-icons/fi';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { ADJECTIVES, MOVIES, VOWELSUFFIXES, CONSONANTSUFFIXES, PREFIXES, VOWELS, NOUNS } from '../constants/constants';

export default function TeamGenerator({ handleLike }) {
    const [userInput, setUserInput] = useState(''); // state for user input
    const [generatedNames, setGeneratedNames] = useState([]); // to store generated names to be able to display them and also to like them
    const [selectedKeyword, setSelectedKeyword] = useState(''); // to store the selected keyword from the autocomplete
    const [userInputSufficient, setUserInputSufficient] = useState(true); // to check if the user input is sufficient

    // this function is to change the value of the user input as they are typing and also to remove the warning message if the user input becomes sufficient
    const handleChange = (e) => {
        setUserInput(e.target.value);
        if (e.target.value?.length > 2 && !userInputSufficient) {
            setUserInputSufficient(true);
        }
    }

    // this function is to set the selected keyword from the autocomplete
    const handleKeywordSelect = (e, value) => {
        const safeVal = value || '';
        setSelectedKeyword(safeVal);
        setUserInput(safeVal);
    }

    // this function is to generate the names based on the word provided in the parameter
    const generate = (word) => {
        const randomAdjectiveName = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)] + ' ' + word; // this generates a random adjective from the ADJECTIVES array and combines it with the word
        const randomMovieTitleName = MOVIES[Math.floor(Math.random() * MOVIES.length)].replace('$', word); // this generates a random movie title from the MOVIES array and replaces the placeholder with the word
        const randomPrefixName = PREFIXES[Math.floor(Math.random() * PREFIXES.length)] + ' ' + word; // this generates a random prefix from the PREFIXES array and combines it with the word
        const randomVowelName = word
        .replace(/[aeiou]/g, VOWELS[Math.floor(Math.random() * VOWELS.length)])
        .replace(/^./, (match) => match.toUpperCase()); // this replaces all the vowels in the word with a random vowel from the VOWELS array and capitalizes the first letter

        const lastLetter = word[word.length - 1];

        var randomSuffixName = '';

        if (VOWELS.includes(lastLetter)) {
            randomSuffixName = word + VOWELSUFFIXES[Math.floor(Math.random() * VOWELSUFFIXES.length)]; // this generates a random suffix from the VOWELSUFFIXES array and combines it with the word
        } else {
            randomSuffixName = word + CONSONANTSUFFIXES[Math.floor(Math.random() * CONSONANTSUFFIXES.length)]; // this generates a random suffix from the CONSONANTSUFFIXES array and combines it with the word
        }

        setGeneratedNames([randomAdjectiveName, randomMovieTitleName, randomPrefixName, randomVowelName, randomSuffixName]);
    }

    // this function uses the generate function to generate names based on the user input
    const handleGenerate = () => {
        if (userInput && userInput?.length < 3) {
            setUserInputSufficient(false);
        } else {
            generate(userInput);
        }
    }

    // this function uses the generate function to generate names based on a random name from the NOUNS array
    const handleGenerateRandom = () => {
        const randomNoun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
        generate(randomNoun);
    }

    return (
        <div className="page">
            <div className="team-generator-card">
                <div className="left-side">
                    <h1>Type a keyword</h1>
                    <div className="input-button">
                    <Autocomplete
                            freeSolo
                            options={NOUNS}
                            value={selectedKeyword}
                            onChange={handleKeywordSelect}
                            inputValue={userInput}
                            onInputChange={handleChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Keyword"
                                    placeholder="E.g. a sport, fruit, industry, car brand, anything really!"
                                    className="keyword-input"
                                />
                            )}
                        />
                        {/*The following is the warning sentence beneath the input field to inform the user*/}
                        {!userInputSufficient && (
                            <p className="warning">Your keyword should have more than two characters!</p>
                        )}
                        <button className="generate-btn" onClick={handleGenerate}>Generate</button>
                    </div>
                    <p className="random-generation-label">Don't feel like it?</p>
                    <button className="generate-btn" onClick={handleGenerateRandom}>Generate Randomly</button>
                </div>
                <div className='right-side'>
                    {/*The following is the array of the generated names being mapped and only replacing the placeholder text of "The generated names will appear here if the user decided to generate anything"*/}
                    {generatedNames.length > 0 ? (
                        <ul className="generated-names">
                            {generatedNames.map((name, index) => (
                                <li onClick={
                                    () => handleLike(name)
                                }>
                                    <span>{name}</span>
                                    <FiHeart className='heart' size={25} />
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
