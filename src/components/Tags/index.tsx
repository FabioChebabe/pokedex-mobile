import { Container, Label } from './styles';

interface TagProps {
  type: string;
}

const Tag = ({ type }: TagProps) => {
  return (
    <Container pokemonType={type}>
      <Label typography='subtitle3'>{type}</Label>
    </Container>
  );
};

export default Tag;
