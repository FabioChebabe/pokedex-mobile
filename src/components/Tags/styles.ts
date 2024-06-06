import styled from 'styled-components/native';
import { PokemonTypeColorKeyType } from '../../theme';
import TextWrapped from '../Text';

interface ContainerProps {
  pokemonType: PokemonTypeColorKeyType;
}

export const Container = styled.View<ContainerProps>`
  border-radius: 16px;
  padding-horizontal: 8px;
  padding-vertical: 2px;
  background-color: ${({ theme, pokemonType }) =>
    theme.colors.pokemonType[pokemonType]};
`;

export const Label = styled(TextWrapped)`
  color: white;
  font-size: 14x;
  font-weight: 700;
`;
