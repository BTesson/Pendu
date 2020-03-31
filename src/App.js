import React, { Component } from 'react';
import './App.css';
import LetterToGuess from './LetterToGuess';
import InformationPlayer from './InformationPlayer';
import KeyLetter from './KeyLetter';
import Player from './Player';

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
    this.setState({currentPlayer: currentPlayer == 0 ? 1 : 0});
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
    players[currentPlayer].player.score = players[currentPlayer].player.score + value;
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
    return (
      <div className="pendu">
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
              <label>Gagnant: {(players[0].player.score != players[1].player.score) ? 
                                (players[0].player.score > players[1].player.score) ? players[0].player.name :  players[1].player.name 
                              : 
                                "Equality"}</label>  
            </div>
          : players[currentPlayer].player.score <= 0 ?
              <div className="status-of-game">
                <label>Peru</label>
              </div>
            :
              <InformationPlayer
                stroke = {players[currentPlayer].player.stroke}
                name = {players[currentPlayer].player.name}
                score = {players[currentPlayer].player.score}
              />
        }

        <div className="keyboard">
          { 
            won || players[currentPlayer].player.score <= 0 ? 
              <button className="button-played-again" onClick={this.handleClickNewGame}>Played again</button>
            :              
              players[currentPlayer].keyboardLetter.map((elmt, index) => (
                <KeyLetter
                  letter = {elmt}
                  feedback = {this.getFeedBack(elmt) ? 'tested' : 'untested'}
                  onClick = {this.handleClickLetter}
                  key = {index}
                />
              ))
          }
        </div>
      </div>
    );
  }

}

export default App;