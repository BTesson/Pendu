import React, { Component, Suspense, useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler'
import './App.css';
import Player from './Player';
const LetterToGuess = React.lazy(() => import('./LetterToGuess'));
const InformationPlayer = React.lazy(() => import('./InformationPlayer'));
const KeyLetter = React.lazy(() => import( './KeyLetter'));

const ALPHABET_LETTER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ALL_WORDS = [
  "TIRANA", "BERLIN", "VIENNE", "BRUXELLLES", "MINSK", "SARAJEVO", "SOFIA", "NICOSIE", "ZAGREB", "COPENHAGUE", "MADRID",
  "TALLINN", "HELSINKI", "PARIS", "ATHENES", "BUDAPEST", "DUBLIN", "REYKJAVIK", "ROME", "PRISTINA", "RIGA", "VADUZ",
  "VILNUS", "LUXEMBOURG", "SKOPJE", "VALETTE", "PODGORICA", "OSLO", "AMSTERDAM", "VARSOVIE", "LISBONNE", "PRAGUE",
  "BUCAREST", "LONDRES", "MOSCOU", "BELGRADE", "BRATISLAVA", "LJUBLJANA", "BERNE", "STOCKHOLM", "KIEV", "VATICAN",
  "ANDORE",
];
const START_SCORE = 10;
const START_STROKE = 0;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      wordToFind: this.generationWord(),
      wordInProgress: [],
      currentPlayer: 0,
      players: [
        {
          player: new Player('Player 1', START_SCORE, START_STROKE),
          keyboardLetter: this.generationKeyboardLetter(),
        },
        {
          player: new Player('Player 2', START_SCORE, START_STROKE),
          keyboardLetter: this.generationKeyboardLetter(),
        }
      ],
    };
  }

  generationKeyboardLetter() {
    let result = [];
    let i;
    let letters = ALPHABET_LETTER.split('');
    while ((i = letters.shift()) !== undefined) {
      result.push(i);
    }
    return result;
  }

  generationWord() {
    let result = [];
    let oneWord = Math.floor(Math.random() * ALL_WORDS.length);
    oneWord = ALL_WORDS[oneWord];
    let word = oneWord.split('');
    let i;
    while ((i = word.shift()) !== undefined) {
      result.push(i)
    }
    return result;
  }

  getFeedBack = letter => {
    return this.state.wordInProgress.includes(letter)
  }

  handleClickLetter = letter => {
    const {wordInProgress, currentPlayer, players} = this.state;
    this.getScore(letter);   
    this.setState({wordInProgress: [...wordInProgress, letter]});
    players[currentPlayer].player.stroke++; 
    this.setState({players: players});
    this.setState({currentPlayer: currentPlayer === 0 ? 1 : 0});
  }

  getScore = letter => {
    const {wordToFind, wordInProgress, currentPlayer, players} = this.state;
    let value;
    if(wordInProgress.includes(letter)){
      value = -2;
    } else if (wordToFind.includes(letter)) {
      value = 2;
    } else {
      value = -1;
    }
    players[currentPlayer].player.score += value;
    this.setState({players: players});
  }

  handleClickNewGame = () => {
    this.setState({
      wordToFind: this.generationWord(),
      wordInProgress: [],
      players: [
        {
          player: new Player('Player 1', START_SCORE, START_STROKE),
          keyboardLetter: this.generationKeyboardLetter(),
        },
        {
          player: new Player('Player 2', START_SCORE, START_STROKE),
          keyboardLetter: this.generationKeyboardLetter(),
        }
      ],
    });
  }

  render() {
    const {wordToFind, wordInProgress, currentPlayer, players} = this.state;
    const won = wordToFind.filter(elmt => wordInProgress.includes(elmt)).length === wordToFind.length;
    const playerKeyboard = players[currentPlayer].keyboardLetter;
    const playerName = players[currentPlayer].player.name;
    const playerScore = players[currentPlayer].player.score;
    const playerStroke = players[currentPlayer].player.stroke;

    return (
      <div className="pendu">
        <Suspense fallback={<p>Chargement</p>}>
        <h1>Pendu des capitales du continent Europe</h1>
        <div className="word">
          {
            wordToFind.map((elmt, index) => (
              <LetterToGuess 
                letter = {elmt}
                feedback = {this.getFeedBack(elmt) ? "visible" : "hidden"}
                key = {index} 
              />
            ))
          }
        </div>
        
        {
          won ?
            <div className="status-of-game">
              <label>Gagnant: {(players[0].player.score !== players[1].player.score) ? 
                                (players[0].player.score > players[1].player.score) ? players[0].player.name :  players[1].player.name 
                              : 
                                "Equality"}</label>  
            </div>
          : playerScore <= 0 ?
              <div className="status-of-game">
                <label>Perdu</label>
              </div>
            :
              <InformationPlayer
                stroke = {playerStroke}
                name = {playerName}
                score = {playerScore}
              />
        }

        <div className="keyboard">
          { 
            won || playerScore <= 0 ? 
              <button className="button-played-again" onClick={this.handleClickNewGame}>Played again
                <KeyboardEventHandler
                  handleKeys={['enter']}
                  onKeyEvent={this.handleClickNewGame}
                />
              </button>
            :              
            playerKeyboard.map((elmt, index) => (
                 <KeyLetter
                  letter = {elmt}
                  feedback = {this.getFeedBack(elmt) ? 'tested' : 'untested'}
                  onClick = {this.handleClickLetter}
                  key = {index}
                />
              ))
          }
        </div>
        </Suspense>
      </div>
    );
  }
}

/**
 * Class avec création d'élément sans JSX
 */
class Testeux extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        {
          React.createElement('div',{className: this.props.index}, this.props.elmt)
        }
        <CustomButton letter={this.props.elmt} />
      </div>
    );
  }
}

/**
 * Hook state
 */
function CustomButton({letter}){
  const [state, setState] = useState('untested');
  return (
    <button className={state} onClick={() => {setState('tested')}}>{letter}</button>
  )
}


export default App;