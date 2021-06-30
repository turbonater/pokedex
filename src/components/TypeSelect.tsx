import * as React from "react";
import {
  Box,
  HStack,
  CheckboxProps,
  useCheckboxGroup,
  useRadio,
  useRadioGroup,
  RadioProps,
} from "@chakra-ui/react";
import { PokemonType, pokemonTypes, typeStyles } from "../utils/pokemonTypes";
import * as Color from "color";
import useStore from "../Store";

const CheckBoxCard = (props: RadioProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  const type = props.value as PokemonType;

  return (
    <Box as="label">
      <input {...input} />
      <Box
        bg="#fff"
        {...checkbox}
        cursor="pointer"
        borderWidth="2px"
        borderColor={Color(typeStyles[type].color).alpha(0.3).toString()}
        color={Color(typeStyles[type].color).alpha(0.3).toString()}
        borderRadius="xl"
        boxShadow="md"
        _checked={{
          bg: Color(typeStyles[type].color).alpha(0.1).toString(),
          color: typeStyles[type].color,
          borderColor: typeStyles[type].color,
        }}
        px={3}
        py={1.5}
      >
        {`${typeStyles[type].emoji} `}
        {props.children}
      </Box>
    </Box>
  );
};

const TypeSelect = () => {
  const types = pokemonTypes;
  const setType = useStore((state) => state.setType);
  const { getRootProps: getRadioRootProps, getRadioProps } = useRadioGroup({
    name: "filters",
    onChange: (val) => {
      setType(val);
    },
  });

  return (
    <HStack {...getRadioRootProps()}>
      {types.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <CheckBoxCard bg="#fff" key={value} value={value} {...radio}>
            {value}
          </CheckBoxCard>
        );
      })}
    </HStack>
  );
};

export default TypeSelect;
