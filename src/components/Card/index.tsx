import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import usePokemonApi from '../../hooks/usePokemonApi';
import { Pokemon } from 'pokenode-ts';
import { useNavigation } from '@react-navigation/native';

interface CardProps {
  pokemonName: string;
  pokemonId: string;
}

const Card: React.FC<CardProps> = ({ pokemonId, pokemonName }) => {
  const { api } = usePokemonApi();
  const [pokemon, setPokemon] = useState<Pokemon | undefined>();
  const navigation = useNavigation();

  useEffect(() => {
    async function getPokemonInfo() {
      const response = await api.getPokemonByName(pokemonName);

      setPokemon(response);
    }

    getPokemonInfo();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { pokemon })}
      style={{
        borderRadius: 8,
        padding: 8,
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Text style={{ alignSelf: 'flex-end' }}>{pokemonId}</Text>
      <Image
        source={{ uri: pokemon?.sprites.front_default }}
        alt="pokemon"
        style={{ width: 100, height: 100 }}
      />
      <Text>{pokemonName}</Text>
    </TouchableOpacity>
  );
};

export default Card;
