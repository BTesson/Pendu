import React, {useState} from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import './KeyLetter.css'

function KeyLetter({letter, feedback, onClick}) {
    return (
        <button className={feedback} onClick={() => onClick(letter)}>
            {letter}        
            <KeyboardEventHandler
                handleKeys={[letter, letter.toLowerCase()]}
                onKeyEvent={(key, e) => onClick(letter)}
            />
        </button>
    );
};

export default KeyLetter;     