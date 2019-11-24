import React, { useState } from 'react';
import './App.css';
import Scoresheet from './components/Scoresheet';
import GameControls from './components/GameControls';
import {
  upperSectionEn,
  lowerSectionEn,
  upperSectionFi,
  lowerSectionFi,
  uiLabelsEn,
  uiLabelsFi
} from './language';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [upperScores, setUpperScores] = useState({});
  const [lowerScores, setLowerScores] = useState({});
  const [scoreSums, setScoreSums] = useState({});
  const [language, setLanguage] = useState('en');

  // Add a new player.

  const handleAddPlayer = playerName => {
    const updatedPlayers = [...players, playerName];
    setPlayers(updatedPlayers);

    // Intitialize the player's upper score section with empty values.

    const updatedUpperScores = {
      ...upperScores,
      [playerName]: Array(6).fill('')
    };

    setUpperScores(updatedUpperScores);

    // Intitialize the player's lower score section with empty values.

    const updatedLowerScores = {
      ...lowerScores,
      [playerName]: Array(9).fill('')
    };
    setLowerScores(updatedLowerScores);

    // Set the player's upper and lower score sums to zeros.

    const updatedScoreSums = {
      ...scoreSums,
      [playerName]: { upperScoreSum: 0, lowerScoreSum: 0 }
    };
    setScoreSums(updatedScoreSums);
  };

  // Clear all the players' scores from the score sheet.

  const handleClearScores = () => {
    // Set all the players' upper scores to empty values.

    const updatedUpperScores = { ...upperScores };
    Object.keys(updatedUpperScores).forEach(
      player =>
        (updatedUpperScores[player] = updatedUpperScores[player].map(
          score => ''
        ))
    );
    setUpperScores(updatedUpperScores);

    // Set all the players' lower scores to empty values.

    const updatedLowerScores = { ...lowerScores };
    Object.keys(updatedLowerScores).forEach(
      player =>
        (updatedLowerScores[player] = updatedLowerScores[player].map(
          score => ''
        ))
    );
    setLowerScores(updatedLowerScores);

    // Set all the players' upper and lower score sums to zero.

    const updatedScoreSums = { ...scoreSums };
    Object.keys(updatedScoreSums).forEach(player => {
      updatedScoreSums[player].upperScoreSum = 0;
      updatedScoreSums[player].lowerScoreSum = 0;
    });
    setScoreSums(updatedScoreSums);
  };

  // Remove all the players and their scores from the score sheet.

  const handleClearPlayers = () => {
    setPlayers([]);
    setUpperScores({});
    setLowerScores({});
    setScoreSums({});
  };

  // Change the language.

  const handleToggleLanguage = () => {
    language === 'en' ? setLanguage('fi') : setLanguage('en');
  };

  // Change an upper or lower score value on the score sheet.

  const handleChangeScoreValue = (
    scoreSection,
    scoreIndex,
    { target: { name, value } }
  ) => {
    const updatedScores =
      scoreSection === 'upperScore' ? { ...upperScores } : { ...lowerScores };

    const updatedScoreSums = { ...scoreSums };

    updatedScores[name] = updatedScores[name].map((score, index) =>
      index === scoreIndex ? value : score
    );

    const scoreSum = calculateScoreSum(updatedScores[name]);
    const scoreSumSection =
      scoreSection === 'upperScore' ? 'upperScoreSum' : 'lowerScoreSum';
    updatedScoreSums[name][scoreSumSection] = scoreSum;
    setScoreSums(updatedScoreSums);

    if (scoreSection === 'upperScore') {
      setUpperScores(updatedScores);
    } else {
      setLowerScores(updatedScores);
    }
  };

  // Calculate a player's total score for upper or lower score section.

  const calculateScoreSum = scoreSection =>
    scoreSection.reduce((accumulator, currentValue) => {
      const currentInt = parseInt(currentValue);
      if (!Number.isNaN(currentInt)) {
        return accumulator + currentInt;
      } else {
        return accumulator;
      }
    }, 0);

  const upperSection = language === 'en' ? upperSectionEn : upperSectionFi;
  const lowerSection = language === 'en' ? lowerSectionEn : lowerSectionFi;
  const uiLabels = language === 'en' ? uiLabelsEn : uiLabelsFi;

  return (
    <div className="App">
      <GameControls
        players={players}
        addPlayer={handleAddPlayer}
        clearScores={handleClearScores}
        clearPlayers={handleClearPlayers}
        toggleLanguage={handleToggleLanguage}
        uiLabels={uiLabels}
      />
      <Scoresheet
        players={players}
        upperScores={upperScores}
        lowerScores={lowerScores}
        scoreSums={scoreSums}
        upperSection={upperSection}
        lowerSection={lowerSection}
        changeScoreValue={handleChangeScoreValue}
        uiLabels={uiLabels}
      />
    </div>
  );
};

export default App;
