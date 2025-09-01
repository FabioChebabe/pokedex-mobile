import { PokemonClient } from "pokenode-ts";
import { useMemo } from "react";

const usePokemonApi = () => {
  const api = useMemo(() => new PokemonClient(), []);

  return { api };
};

export default usePokemonApi;
