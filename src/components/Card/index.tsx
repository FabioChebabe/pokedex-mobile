import React, { useEffect, useState } from 'react';
import { Text, Image, View } from 'react-native';
import usePokemonApi from '../../hooks/usePokemonApi';
import { Pokemon } from 'pokenode-ts';
import { useNavigation } from '@react-navigation/native';
import { Container, ContentContainer } from './styles';

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
    <Container onPress={() => navigation.navigate('Details', { pokemon })}>
      <ContentContainer>
        <Text style={{ alignSelf: 'flex-end' }}>{pokemonId}</Text>
        <Image
          source={{ uri: pokemon?.sprites.front_default }}
          alt="pokemon"
          style={{ width: 100, height: 100 }}
        />
        <Text>{pokemonName}</Text>
      </ContentContainer>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#ddd',
          borderRadius: 8,
          height: '40%',
          width: '100%',
          zIndex: 0,
        }}
      />
    </Container>
  );
};

export default Card;
