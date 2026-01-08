import { useState, useEffect } from 'react';
import styled from 'styled-components';

const BattleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  min-height: 100vh;
  background: #000;
  margin: 0 auto;
  border: 4px solid #333;
  border-radius: 8px;
  box-shadow: 0 0 40px rgba(0,0,0,0.3);
  image-rendering: pixelated;
  overflow: hidden;
  position: relative;

  @media (min-width: 1024px) {
    min-height: 90vh;
    margin: 2vh auto;
  }
`;

const BattleField = styled.div`
  width: 100%;
  height: 320px;
  background: url('/bg.png') no-repeat center center;
  background-size: contain;
  position: relative;
  overflow: hidden;
  image-rendering: pixelated;
  background-color: #000;

  @media (min-width: 1024px) {
    height: 400px;
  }
`;

const PokemonPlatform = styled.div`
  position: absolute;
  ${props => props.isPlayer ? `
    margin-bottom: 10px;
    bottom: 20%;
    left: 10%;
    width: 100px;
    height: 20px;
    border-radius: 6px;
  ` : `
    top: 20%;
    right: 10%;
    width: 100px;
    height: 20px;

    border-radius: 6px;
  `}
  z-index: 1;
`;

const PlayerPokemonContainer = styled.div`
  position: absolute;
  bottom: 39%;
  left: 20%;
  z-index: 3;
`;

const AIPokemonContainer = styled.div`
  position: absolute;
  top: 25%;
  right: 21%;
  z-index: 3;
`;

const PlayerPokemonSprite = styled.img`
  margin-bottom: -65px;
  width: 78px;
  height: 78px;
  image-rendering: pixelated;
  transform: scale(2.5);
  position: relative;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
`;

const AIPokemonSprite = styled.img`
  margin-bottom: -65px;
  width: 78px;
  height: 78px;
  image-rendering: pixelated;
  transform: scale(2.5);
  position: relative;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
`;

const StatusBox = styled.div`
  position: absolute;
  background: #fff;
  border: 3px solid #333;
  padding: 8px 12px;
  min-width: 200px;
  border-radius: 4px;
  ${props => props.isPlayer ? `
    bottom: 8%;
    right: 8%;
  ` : `
    top: 8%;
    left: 8%;
  `}
  z-index: 2;
`;

const PokemonInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const PokemonName = styled.div`
  font-family: monospace;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::after {
    content: 'L31';
    font-size: 14px;
  }
`;

const HealthBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const HealthLabel = styled.div`
  display: flex;
  align-items: center;
  font-family: monospace;
  font-size: 8px;
  color: #000;

  span:first-child {
    margin-right: 4px;
  }
`;

const HealthBar = styled.div`
  width: 100%;
  height: 6px;
  background: #ccc;
  border: 1px solid #000;
  position: relative;
  border-radius: 3px;
  overflow: hidden;
`;

const HealthFill = styled.div`
  width: ${props => props.health}%;
  height: 100%;
  background: ${props => props.health > 50 ? '#00ff00' : props.health > 25 ? '#ffff00' : '#ff0000'};
  transition: width 0.3s ease;
`;

const BattleControls = styled.div`
  width: 100%;
  background: #fff;
  border-top: 4px solid #333;
  padding: 12px;
`;

const MovesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 1000px;

  margin: 0 0 10px 0;
  padding: 0 20px;
`;

const MoveButton = styled.button`
  background: #fff;
  color: #000;
  padding: 16px;
  border: 2px solid #000;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  text-align: center;
  transition: all 0.2s ease;
  min-height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover:not(:disabled) {
    background: #f0f0f0;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::after {
    content: 'PP ${props => props.pp || '20'}/30';
    position: absolute;
    bottom: 8px;
    right: 8px;
    font-size: 12px;
    color: #666;
  }
`;

const BattleLog = styled.div`
  width: 100%;
  background: #fff;
  border-top: 4px solid #333;
  padding: 12px;
  height: 100px;
  position: relative;
  display: flex;
  align-items: flex-start;

  &::before {
    content: '';
    position: absolute;
    top: 12px;
    left: 12px;
    right: 12px;
    bottom: 12px;
    border: 3px solid #a8a878;
    border-radius: 8px;
    pointer-events: none;
  }

  .message-container {
    width: 100%;
    height: 80px;
    overflow-y: auto;
    padding: 12px 24px;
    font-family: monospace;
    font-size: 18px;
    line-height: 1.6;
    color: #2d2d2d;
    scroll-behavior: smooth;

    /* Hide scrollbar */
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    div {
      position: relative;
      padding-left: 28px;
      margin-bottom: 8px;
      
      &:last-child {
        margin-bottom: 0;
        &::before {
          content: '▶';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          color: #2d2d2d;
          font-size: 16px;
        }
      }
    }
  }
`;

const BattleScreen = ({ playerPokemon, onBattleEnd }) => {
  const [aiPokemon, setAiPokemon] = useState(null);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [aiHealth, setAiHealth] = useState(100);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [battleLog, setBattleLog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAiPokemon = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const randomId = Math.floor(Math.random() * 151) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch AI Pokemon');
        }
        const data = await response.json();
        setAiPokemon({
          id: data.id,
          name: data.name,
          image: data.sprites.front_default,
          sprites: data.sprites,
          stats: data.stats,
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching AI pokemon:', error);
        setError('Failed to load AI Pokemon. Please try again.');
        setIsLoading(false);
      }
    };

    if (!aiPokemon) {
      fetchAiPokemon();
    }
  }, [aiPokemon]);

  if (isLoading) {
    return (
      <BattleContainer>
        <div style={{ color: '#fff', padding: '20px' }}>Loading battle...</div>
      </BattleContainer>
    );
  }

  if (error) {
    return (
      <BattleContainer>
        <div style={{ color: 'red', padding: '20px' }}>{error}</div>
        <button onClick={() => window.location.reload()}>Retry</button>
      </BattleContainer>
    );
  }

  if (!playerPokemon || !aiPokemon) {
    return (
      <BattleContainer>
        <div style={{ color: '#fff', padding: '20px' }}>Loading Pokemon...</div>
      </BattleContainer>
    );
  }

  const handleMove = async (move) => {
    if (!isPlayerTurn) return;

    setIsPlayerTurn(false);
    setBattleLog(prev => [...prev, `${playerPokemon.name} used ${move}!`]);

    // Calculate and apply player's damage
    const damage = Math.floor(Math.random() * 30) + 10;
    const newAiHealth = Math.max(0, aiHealth - damage);
    setAiHealth(newAiHealth);

    // Check if AI is defeated
    if (newAiHealth <= 0) {
      setBattleLog(prev => [...prev, `${aiPokemon.name} fainted!`]);
      onBattleEnd?.(playerPokemon);
      return;
    }

    // AI's turn
    setTimeout(() => {
      const aiMove = 'Tackle';
      const aiDamage = Math.floor(Math.random() * 30) + 10;
      const newPlayerHealth = Math.max(0, playerHealth - aiDamage);
      
      setPlayerHealth(newPlayerHealth);
      setBattleLog(prev => [...prev, `${aiPokemon.name} used ${aiMove}!`]);
      
      // Check if player is defeated
      if (newPlayerHealth <= 0) {
        setBattleLog(prev => [...prev, `${playerPokemon.name} fainted!`]);
        onBattleEnd?.(aiPokemon);
        return;
      }

      setIsPlayerTurn(true);
    }, 1500);

    // Auto-scroll battle log
    setTimeout(() => {
      const messageContainer = document.querySelector('.message-container');
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    }, 50);
  };

  return (
    <BattleContainer>
      <BattleField>
        <PokemonPlatform isPlayer={true} />
        <PokemonPlatform isPlayer={false} />
        <PlayerPokemonContainer>
          <PlayerPokemonSprite 
            src={playerPokemon.sprites?.back_default || playerPokemon.image} 
            alt={playerPokemon.name}
          />
        </PlayerPokemonContainer>
        <AIPokemonContainer>
          <AIPokemonSprite 
            src={aiPokemon.sprites?.front_default || aiPokemon.image} 
            alt={aiPokemon.name}
          />
        </AIPokemonContainer>
        <StatusBox isPlayer={true}>
          <PokemonInfo>
            <PokemonName>{playerPokemon.name}</PokemonName>
            <HealthBarContainer>
              <HealthLabel>
                <span>HP</span>
                <span>{playerHealth}/100</span>
              </HealthLabel>
              <HealthBar>
                <HealthFill health={playerHealth} />
              </HealthBar>
            </HealthBarContainer>
          </PokemonInfo>
        </StatusBox>
        <StatusBox isPlayer={false}>
          <PokemonInfo>
            <PokemonName>{aiPokemon.name}</PokemonName>
            <HealthBarContainer>
              <HealthLabel>
                <span>HP</span>
                <span>{aiHealth}/100</span>
              </HealthLabel>
              <HealthBar>
                <HealthFill health={aiHealth} />
              </HealthBar>
            </HealthBarContainer>
          </PokemonInfo>
        </StatusBox>
      </BattleField>

      <BattleControls>
        <MovesContainer>
          <MoveButton onClick={() => handleMove('TACKLE')} disabled={!isPlayerTurn}>
            TACKLE
          </MoveButton>
          <MoveButton onClick={() => handleMove('SCRATCH')} disabled={!isPlayerTurn}>
            SCRATCH
          </MoveButton>
          <MoveButton onClick={() => handleMove('QUICK ATTACK')} disabled={!isPlayerTurn}>
            QUICK ATTACK
          </MoveButton>
          <MoveButton onClick={() => handleMove('BITE')} disabled={!isPlayerTurn}>
            BITE
          </MoveButton>
        </MovesContainer>
      </BattleControls>

      <BattleLog>
        <div className="message-container">
          {battleLog.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </BattleLog>
    </BattleContainer>
  );
};

export default BattleScreen; 