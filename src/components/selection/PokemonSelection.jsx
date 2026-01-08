import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 800px;
  width: 100%;
`;

const PokemonCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.2);
  }

  &.selected {
    background: rgba(255, 215, 0, 0.3);
    border: 2px solid #ffd700;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent);
    border-radius: 10px 10px 0 0;
  }
`;

const PokemonImage = styled.img`
  width: 96px;
  height: 96px;
  object-fit: contain;
  image-rendering: pixelated;
  transform: scale(2);
`;

const PokemonName = styled.h3`
  margin-top: 0.5rem;
  text-transform: capitalize;
`;

const StartButton = styled.button`
  background: #ffd700;
  color: #1a1a1a;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const PokemonSelection = ({ onStartBattle }) => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch only Gen 1 Pokemon (1-151)
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const shuffled = response.data.results.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 12); // Get 12 random Pokemon

        const pokemonData = await Promise.all(
          selected.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            const sprites = details.data.sprites;
            return {
              id: details.data.id,
              name: details.data.name,
              image: sprites.front_default, // Use regular sprite as fallback
              sprites: sprites,
              stats: details.data.stats,
            };
          })
        );
        setPokemons(pokemonData);
      } catch (error) {
        console.error('Error fetching pokemons:', error);
        setError('Failed to load Pokemons. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon({
      ...pokemon,
      image: pokemon.sprites.front_default, // Use regular sprite for consistent display
    });
  };

  if (loading) {
    return (
      <SelectionContainer>
        <div>Loading Pokémons...</div>
      </SelectionContainer>
    );
  }

  if (error) {
    return (
      <SelectionContainer>
        <div style={{ color: 'red' }}>{error}</div>
        <button onClick={() => window.location.reload()}>Retry</button>
      </SelectionContainer>
    );
  }

  if (!pokemons.length) {
    return (
      <SelectionContainer>
        <div>No Pokémons found</div>
        <button onClick={() => window.location.reload()}>Retry</button>
      </SelectionContainer>
    );
  }

  return (
    <SelectionContainer>
      <h2>Choose your Pokémon!</h2>
      <PokemonGrid>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            className={selectedPokemon?.id === pokemon.id ? 'selected' : ''}
            onClick={() => handleSelectPokemon(pokemon)}
          >
            <PokemonImage src={pokemon.image} alt={pokemon.name} />
            <PokemonName>{pokemon.name}</PokemonName>
          </PokemonCard>
        ))}
      </PokemonGrid>
      <StartButton
        disabled={!selectedPokemon}
        onClick={() => onStartBattle(selectedPokemon)}
      >
        Start Battle!
      </StartButton>
    </SelectionContainer>
  );
};

export default PokemonSelection; 