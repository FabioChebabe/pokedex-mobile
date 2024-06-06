import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 3;

export const Container = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: white;
  width: ${cardWidth}px;

  shadow-color: #000000;
  shadow-opacity: 0.25;
  shadow-offset: {
    height: 1;
    width: 1;
  }
`;

export const ContentContainer = styled.View`
  z-index: 1;
  padding: 8px;
  align-items: center;
`;
