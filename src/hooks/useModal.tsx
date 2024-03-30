import { useState } from 'react';
import PokemonModal from '../components/PokemonModal';

const useModal = () => {
  const [pokemon, setPokemon] = useState(null);

  const Modal = () => <PokemonModal pokemon={pokemon} onClose={() => setPokemon(null)} />;

  return { Modal, setPokemon }
};

export default useModal;