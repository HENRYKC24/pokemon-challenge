import React from 'react';
import css from './styles.module.scss';

interface Pokemon {
  name: string;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  }
};

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }): JSX.Element => {
  const handleClick = () => onClick(pokemon);

  return (
    <button
      type="button"
      className={css.card}
      onClick={handleClick}
    >
      <img src={pokemon.sprites.other.home.front_default} alt={pokemon.name} className={css.sprite} />
      <span className={css.name}>{pokemon.name}</span>
    </button>
  );
};

export default PokemonCard;
