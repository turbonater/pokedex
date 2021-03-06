import * as React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import PokeCard from "./PokeCard";
import styled from "styled-components";
import { PokemonGenResponse, PokemonTypeResponse } from "../../types";
import { motion } from "framer-motion";
import { Spinner } from "@chakra-ui/react";

interface QueryType {
  queryKey: Array<any>;
}

const fetchPokemons = async ({ queryKey }: QueryType) => {
  const type = queryKey[1];
  const gen = queryKey[2];

  const { data } = !type
    ? await axios.get<PokemonGenResponse>(
        `https://pokeapi.co/api/v2/generation/${gen ?? "1"}`
      )
    : await axios.get<PokemonTypeResponse>(
        `https://pokeapi.co/api/v2/type/${type}`
      );
  return data;
};

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5em;
`;

const PokemonCards = () => {
  const params = new URLSearchParams(location.search);
  const pokemonType = params.get("type");
  const generation = params.get("generation");

  const { data, status } = useQuery(
    ["pokemons", pokemonType, generation],
    fetchPokemons
  );
  let rowCount = 0;

  return (
    <Container>
      {status === "loading" && <Spinner size="lg" thickness="4px" mt="25vh" />}
      {!pokemonType &&
        status === "success" &&
        (data as PokemonGenResponse).pokemon_species.map((pokemon) => (
          <PokeCard key={pokemon.name} title={pokemon.name} />
        ))}
      {pokemonType &&
        status === "success" &&
        (data as PokemonTypeResponse).pokemon.map((pokemon) => (
          <PokeCard key={pokemon.pokemon.name} title={pokemon.pokemon.name} />
        ))}
    </Container>
  );
};

export default PokemonCards;
