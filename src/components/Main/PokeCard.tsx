import axios from "axios";
import * as React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Pokemon } from "../../types";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import { useTheme } from "../../theme/theme";
import { useHistory } from "react-router-dom";
import usePokemon from "../../hooks/usePokemon";
import { motion } from "framer-motion";

export const BASE_SPRITE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 220px;
  min-height: 270px;
  padding: 2em;
  border-radius: 5px;
  margin: 0em 0.75em 1.5em 0.75em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  img {
    height: 150px;
    filter: drop-shadow(5px 5px 0.2em rgba(0, 0, 0, 0.5));
  }
  p {
    font-family: "Open Sans", sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 20px;
    color: rgba(0, 0, 0, 0.8);
  }
  p:first-letter {
    text-transform: capitalize;
  }
`;

interface Props {
  title: string;
  style?: React.CSSProperties;
}

const PokeCard = (props: Props) => {
  const { title } = props;
  const { data, status } = useQuery(
    ["pokemon-img", title],
    ({ queryKey: [_, pokemonName] }) => usePokemon(pokemonName),
    { enabled: Boolean(title) }
  );
  const imgUrl = BASE_SPRITE_URL + data?.id + ".png";
  const theme = useTheme();
  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: `/pokemon/${title}`,
    });
  };

  return (
    <Card
      layoutId="expandable-card"
      {...props}
      theme={theme}
      onClick={handleClick}
    >
      {status === "loading" && (
        <>
          <Skeleton style={{ borderRadius: "35px" }} h={100} w={100} />
          <SkeletonText mt={35} w={100} noOfLines={1} />
        </>
      )}
      {status === "success" && (
        <>
          <img src={imgUrl} alt="pokemong" />
          <p style={{ color: theme?.text }}>{title}</p>
        </>
      )}
    </Card>
  );
};

export default PokeCard;
