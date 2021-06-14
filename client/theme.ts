import { extendTheme } from "@chakra-ui/react";
import { darken } from "@chakra-ui/theme-tools";

const Button = {
  baseStyles: {},
  sizes: {},
  variants: {
    primary: {
      bg: "#323D4D",
      _hover: {
        background: darken("#323D4D", 4),
      },
    },
  },
  defaultProps: {},
};

const theme = extendTheme({
  colors: {
    primary: "#424f61",
    secondary: "#323D4D",
  },
  components: {
    Button,
  },
});

export default theme;
