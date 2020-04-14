import React from 'react'
import './LetterToGuess.css'

const HIIDEN_LETTER = '_';

const LetterToGuess = ({letter, feedback}) => (
    <div className={'letter-to-guess'}>
        {feedback === 'hidden' ? HIIDEN_LETTER : letter}
    </div>
);

export default LetterToGuess;

/**
 * Avec Hook
 */
/* function LetterToGuess({letter, feedback}) {
    const [state, setState] = useState('_');  
    const [thisLetter, setThisLetter] = useState(letter);
    return(
        <div className={'letter-to-guess'}>
            {feedback ? thisLetter : state}
        </div>
    )
}; */