import React from 'react'
import './KeyLetter.css'

function KeyLetter({letter, feedback, onClick}) {
    return (
        <div className={feedback} onClick={() => onClick(letter)}>
            <span>{letter}</span>
        </div>
    );
};

export default KeyLetter;