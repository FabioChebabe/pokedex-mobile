export type ThemeType = typeof theme;

export type PokemonTypeColorKeyType = keyof typeof pokemonTypeColors;

const pokemonTypeColors = {
  bug: "#A7B723",
  dark: "#75574C",
  dragon: "#7037FF",
  electric: "#F9CF30",
  fairy: "#E69EAC",
  fighting: "#C12239",
  fire: "#F57D31",
  flying: "#A891EC",
  ghost: "#70559B",
  grass: "#74CB48",
  ground: "#DEC16B",
  ice: "#9AD6DF",
  normal: "#AAA67F",
  poison: "#A43E9E",
  psychic: "#FB5584",
  rock: "#B69E31",
  steel: "#B7B9D0",
  water: "#6493EB",
};

const colors = {
  identity: {
    primary: "#DC0A2D",
    secondary: "#28AAFD",
  },
  pokemonType: pokemonTypeColors,
  grayScale: {
    dark: "#1D1D1D",
    medium: "#666666",
    light: "#E0E0E0",
    background: "#EFEFEF",
    white: "#FFFFFF",
    wireframe: "#B8B8B8",
  },
};

//TODO: typographies type
export const theme = {
  colors,
};
