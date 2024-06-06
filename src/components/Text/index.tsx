import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';
import { Align, Typography } from './types';

interface TextWrappedProps extends TextProps {
  typography?: Typography;
  color?: string;
  weight?: string;
  size?: number;
  align?: Align;
}

const TextWrapped = ({
  typography = 'body1',
  color = 'black',
  weight,
  size,
  align,
  ...props
}: TextWrappedProps) => {
  const textAlignStyles: StyleProp<TextStyle> = { textAlign: align };

  return (
    <Text
      {...props}
      style={[
        Platform.select({
          ios: iosStyles[typography],
          android: androidStyles[typography],
        }),
        {
          color: color,
        },
        !!size && { fontSize: size },
        textAlignStyles,
        props.style,
      ]}
    ></Text>
  );
};

const androidStyles = StyleSheet.create({
  headline: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
  },
  subtitle1: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  subtitle2: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  subtitle3: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  body1: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  body2: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  body3: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  caption: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});

const iosStyles = StyleSheet.create({
  headline: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    fontWeight: 700,
    lineHeight: 40,
  },
  subtitle1: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    fontWeight: 700,
    lineHeight: 32,
  },
  subtitle2: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    fontWeight: 700,
    lineHeight: 28,
  },
  subtitle3: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    fontWeight: 700,
    lineHeight: 24,
  },
  body1: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    fontWeight: 400,
    lineHeight: 28,
  },
  body2: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    fontWeight: 400,
    lineHeight: 26,
  },
  body3: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    fontWeight: 400,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: 400,
    lineHeight: 22,
  },
});

export default TextWrapped;
