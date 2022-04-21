import React from 'react';
import "./App.css";
import { Box, Button, Flex, Image, Link, Spacer } from "@chakra-ui/react";
import Facebook from "./assets/social-media-icons/facebook_32x32.png";
import Twitter from "./assets/social-media-icons/twitter_32x32.png";
import Email from "./assets/social-media-icons/email_32x32.png";


const NavBar = ({ accounts, setAccounts }) => {
    //account[0] will be the adress of the account that come back in
    const isConnected = Boolean(accounts[0]);

     const connectAccount = async() => {

        //when we are using metamask ,it injects the application with (window.etherium)
      try{
        if (window.ethereum) {
            //if this exists we can check and grab the accounts from window.metamask

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);

        }
    }
    catch(err) {
        console.log(err)
    }
    }

    return (
        <Flex justify="space-between" align={"center"} padding="30px">
            {/* left side of navbar */}

            <Flex justify="space-around" width={"40%"} padding="0 75px">
                <Link href="https://www.facebook.com/">
                    <Image src={Facebook} boxSize={'42px'} margin="0 15px" />
                </Link>
            </Flex>

            <Flex justify="space-around" width={"40%"} padding="0 75px">
                <Link href="https://www.twitter.com/">
                    <Image src={Twitter} boxSize={'42px'} margin="0 15px" />
                </Link>
            </Flex>

            <Flex justify="space-around" width={"40%"} padding="0 75px">
                <Link href="https://www.gmail.com/">
                    <Image src={Email} boxSize={'42px'} margin="0 15px" />
                </Link>
            </Flex>


            {/* Right side of navbar */}
            <Flex justify={"space-around"} align="center" width="40%" padding={"30px"}>
                <Box margin={"0 15px"}>About</Box>
                <Spacer />
                <Box margin={"0 15px"}>Mint</Box>
                <Spacer />
                <Box margin={"0 15px"}>Team</Box>
                <Spacer />
                {isConnected ? (
                    <Box margin={"0 15px"}>Connected</Box>
                ) : (
                    <Button
                        backgroundColor={"#D6517D"}
                        borderRadius="5px"
                        boxShadow={"0px 2px 2px 1px #0F0F0F"}
                        color="white"
                        cursor="pointer"
                        fontFamily={"inherit"}
                        padding="15px"
                        margin="0 15px"
                        onClick={connectAccount}>connect</Button>
                )}
            </Flex >

            {/* connect */}


        </Flex>
    )
}
export default NavBar;