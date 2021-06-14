import { Box, Flex, Heading } from "@chakra-ui/layout";
import React from "react";
import { Button } from "@chakra-ui/button";
import Image from "next/image";

const Login: React.FC = () => {
  return (
    <div>
      {/* top */}
      <Flex pt="2rem" justifyContent="center" background="#0B0E11" h="10vh">
        <Flex width={["90%", "80%", "75%"]} alignItems="center">
          <Flex alignItems="center">
            <Image height="45px" width="45px" src="/static/Frame.svg" />
            <Heading as="h3" ml={["0.3rem", "0.9rem", "1rem"]} color="red.500">
              bookBUG
            </Heading>
          </Flex>
          <Flex ml="auto">
            <Box
              as="a"
              href="https://www.linkedin.com/in/mahaveer-soni-5946911a8/"
            >
              <Image width="20px" height="20px" src="/static/Linkedin.svg" />
            </Box>
            <Box as="a" href="https://github.com/Mahaveer1141" ml="1.5rem">
              <Image width="20px" height="20px" src="/static/Github.svg" />
            </Box>
          </Flex>
        </Flex>
      </Flex>
      {/* body */}
      <Flex
        justifyContent="center"
        alignItems="center"
        minH="90vh"
        background="#0B0E11"
      >
        <Box
          width={["80%", "70%", "40%", "35%", "25%"]}
          color="white"
          borderRadius="10px"
          padding="2rem"
          background="#191E25"
        >
          <Heading size="lg" color="#F03939">
            Welcome
          </Heading>
          <Box mt="0.5rem">Login to Continue</Box>
          <Button
            href="/login"
            as="a"
            pt="0.3rem"
            pb="0.3rem"
            mt="1rem"
            width="100%"
            variant="primary"
          >
            <Flex mr="20px">
              <Image width="20px" height="20px" src="/static/Github.svg" />
            </Flex>
            Login with Github
          </Button>
          <Button
            href="/login"
            as="a"
            variant="primary"
            pt="0.3rem"
            pb="0.3rem"
            mt="1rem"
            width="100%"
          >
            <Flex mr="20px">
              <Image width="20px" height="20px" src="/static/Google.svg" />
            </Flex>
            Login with Google
          </Button>
        </Box>
      </Flex>
    </div>
  );
};

export default Login;
