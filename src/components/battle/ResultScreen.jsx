import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  text-align: center;
`;

const ResultTitle = styled.h2`
  font-size: 2.5rem;
  color: ${props => props.isWinner ? '#4CAF50' : '#F44336'};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const PlayAgainButton = styled.button`
  background: #ffd700;
  color: #1a1a1a;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  transition: transform 0.2s;
  margin-top: 2rem;

  &:hover {
    transform: scale(1.05);
  }
`;

const ResultScreen = ({ winner, playerPokemon, onPlayAgain }) => {
  const isWinner = winner.id === playerPokemon.id;

  return (
    <ResultContainer>
      <ResultTitle isWinner={isWinner}>
        {isWinner ? 'Victory!' : 'Defeat!'}
      </ResultTitle>
      <PokemonImage src={winner.image} alt={winner.name} />
      <h3>{winner.name} wins the battle!</h3>
      <PlayAgainButton onClick={onPlayAgain}>
        Play Again
      </PlayAgainButton>
    </ResultContainer>
  );
};

export default ResultScreen; 