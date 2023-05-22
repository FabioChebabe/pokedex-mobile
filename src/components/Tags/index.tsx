import { Container, Label } from './styles';

interface TagProps {
  type: string;
}

const Tag = ({ type }: TagProps) => {
  return (
    <Container pokemonType={type}>
      <Label>{type}</Label>
    </Container>
  );
};

export default Tag;
