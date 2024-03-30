import React, { useMemo } from 'react';
import css from './styles.module.scss';
import Icon from "@mdi/react";
import { mdiWindowClose } from "@mdi/js";

interface Type {
  name: string;
}

interface PokemonType {
  type: Type;
}

interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
}

interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: PokemonSprites & {
    other: {
      home: {
        front_default: string;
      };
    };
  };
}

interface SpriteProps {
  alt: string;
  src: string;
  name: string;
}

const Sprite: React.FC<SpriteProps> = ({ alt, src, name }): JSX.Element | null => {
  if (!src) {
    return null;
  }

  return (
    <div className={css.sprite_wrap}>
      <img alt={alt} src={src} className={css.sprite} />
      <span className={css.sprite_name}>{name}</span>
    </div>
  );
};

interface PokemonModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
}

const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, onClose }): JSX.Element | null => {
  const types = useMemo(() => {
    if (!pokemon) {
      return null;
    }

    const title = pokemon.types.length === 1 ? 'Type:' : 'Types:';
    const text = pokemon.types.map(({ type: {name} }) => `${name.charAt(0).toUpperCase()}${name.substring(1).toLowerCase()}`).join(', ');

    return { title, text };
  }, [pokemon]);

  if (!pokemon) {
    return null;
  }

  return (
    <section className={css.container}>
      <div className={css.name_wrap}>
        <span className={css.id}>{pokemon.id}</span>
        <span className={css.name}>{pokemon.name}</span>
      </div>
      <div className={css.home_sprite_wrap}>
        <img className={css.home_sprite} alt={pokemon.name} src={pokemon.sprites.other.home.front_default} />
      </div>
      <div className={css.sprite_board}>
        <Sprite alt="default" src={pokemon.sprites.front_default} name="front default" />
        <Sprite alt="default" src={pokemon.sprites.front_shiny} name="front shiny" />
        <Sprite alt="default" src={pokemon.sprites.front_female} name="front female" />
        <Sprite alt="default" src={pokemon.sprites.front_shiny_female} name="front shiny female" />
        <Sprite alt="default" src={pokemon.sprites.back_default} name="back default" />
        <Sprite alt="default" src={pokemon.sprites.back_shiny} name="back shiny" />
        <Sprite alt="default" src={pokemon.sprites.back_female} name="back female" />
        <Sprite alt="default" src={pokemon.sprites.back_shiny_female} name="back shiny female" />
      </div>
      <div className={css.types_wrap}>
        <div className={css.types}>
          <span className={css.types_title}>{types?.title}</span>
          <span className={css.types_text}>{types?.text}</span>
        </div>
      </div>
      <button
        type="button"
        aria-label="Close"
        title="Close"
        onClick={onClose}
        className={css.close_btn}
      >
        <Icon path={mdiWindowClose} size={1.5} />
      </button>
    </section>
  );
};

export default PokemonModal;
