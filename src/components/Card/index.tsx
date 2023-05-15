import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface CardProps {
  pokemonName: string;
  pokemonId: string;
}

const Card: React.FC<CardProps> = ({ pokemonId, pokemonName }) => {
  return (
    <TouchableOpacity>
      <Text>
        {pokemonId} {pokemonName}
      </Text>
    </TouchableOpacity>
  );
};

export default Card;
