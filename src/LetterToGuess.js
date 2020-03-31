import React from 'react'
import './LetterToGuess.css'

const HIIDEN_LETTER = '_';

const LetterToGuess = ({letter, feedback}) => (
    <div className={'letter-to-guess ${feedback}'}>
        {feedback === 'hidden' ? HIIDEN_LETTER : letter}
    </div>
);

export default LetterToGuess;