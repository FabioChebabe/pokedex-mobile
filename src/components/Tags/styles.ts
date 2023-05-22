import styled from 'styled-components/native';
import { PokemonTypeColorKeyType } from '../../theme';

interface ContainerProps {
  pokemonType: PokemonTypeColorKeyType;
}

export const Container = styled.View<ContainerProps>`
  border-radius: 10;
  padding-horizontal: 8;
  padding-vertical: 2;
  background-color: ${({ theme, pokemonType }) =>
    theme.colors.pokemonType[pokemonType]};
`;

export const Label = styled.Text`
  color: white;
  font-size: 14x;
  font-weight: 700;
`;
