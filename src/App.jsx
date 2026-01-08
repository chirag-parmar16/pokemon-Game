import { useState } from 'react'
import styled from 'styled-components'
import './App.css'
import PokemonSelection from './components/selection/PokemonSelection'
import BattleScreen from './components/battle/BattleScreen'
import ResultScreen from './components/battle/ResultScreen'

const AppContainer = styled.div`
  min-height: 100vh;
 
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const Title = styled.h1`
background: linear-gradient(139deg, #1a1a1a 0%, #4a4a4a 100%);
  font-size: 3rem;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
  padding: 25px;
  border-radius: 10px;
`

function App() {
  const [gameState, setGameState] = useState('selection') // 'selection', 'battle', 'result'
  const [playerPokemon, setPlayerPokemon] = useState(null)
  const [winner, setWinner] = useState(null)

  const handleStartBattle = (pokemon) => {
    setPlayerPokemon(pokemon)
    setGameState('battle')
  }

  const handleBattleEnd = (winner) => {
    setWinner(winner)
    setGameState('result')
  }

  const handlePlayAgain = () => {
    setGameState('selection')
    setPlayerPokemon(null)
    setWinner(null)
  }

  return (
    <AppContainer>
      <Title>Pokémon Battle</Title>
      {gameState === 'selection' && (
        <PokemonSelection onStartBattle={handleStartBattle} />
      )}
      {gameState === 'battle' && (
        <BattleScreen
          playerPokemon={playerPokemon}
          onBattleEnd={handleBattleEnd}
        />
      )}
      {gameState === 'result' && (
        <ResultScreen
          winner={winner}
          playerPokemon={playerPokemon}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </AppContainer>
  )
}

export default App
