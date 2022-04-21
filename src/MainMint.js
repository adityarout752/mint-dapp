import { useState } from "react";
import "./App.css";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { ethers, BigNumber } from "ethers";
import roboPunksNFT from "./RoboPunkNFT.json";

const roboPunksNFTAddress = "0x4087ec9Df5a4f12BBE9baa27CCA7ba37278c8E08"

const MainMint = ({ accounts, setAccounts }) => {
    //used for nibting set is to update
    const [mintAmount, setMintAmount] = useState(1);

    const isConnected = Boolean(accounts[0]);

    const handleMint = async () => {
        if (window.ethereum) {
            //way to connect to blockchain
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            //whenever we need to sign transaction we need signers
            const signer = provider.getSigner();

            const contract = new ethers.contract(
                roboPunksNFTAddress,
                roboPunksNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount));
                console.log("response", response)

            } catch (err) {
                console.log("error", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify={"center"} align="center" height={"100vh"} paddingBottom="150px">
            <Box width={"520px"}>
                <div>
                    <Text fontSize={"48px"} textShadow="0 5px #000000">RoboPunks</Text>
                    <Text fontSize={"30px"}
                        letterSpacing="-5.5%"
                        fontFamily={"VT323"}
                        textShadow="0 2px 2px#000000">Its 2030.can robopunk save from nft speculation.There is lot of speculations out there </Text>
                </div>

                {
                    isConnected ? (
                        <div>
                            <Flex align={"center"} justify="center">
                                <Button
                                    backgroundColor={"#D6517D"}
                                    borderRadius="5px"
                                    boxShadow={"0px 2px 2px 1px #0F0F0F"}
                                    color="white"
                                    cursor="pointer"
                                    fontFamily={"inherit"}
                                    padding="15px"
                                    margin="0 15px"
                                    onClick={handleDecrement}>-</Button>
                                <Input
                                    readOnly
                                    fontFamily={"inherit"}
                                    width="100px"
                                    height={"40px"}
                                    textAlign="center"
                                    paddingLeft={"19px"}
                                    marginTop="0px"

                                    type="number" value={mintAmount} />
                                <Button
                                    backgroundColor={"#D6517D"}
                                    borderRadius="5px"
                                    boxShadow={"0px 2px 2px 1px #0F0F0F"}
                                    color="white"
                                    cursor="pointer"
                                    fontFamily={"inherit"}
                                    padding="15px"
                                    margin="0 15px" onClick={handleIncrement}>+</Button>
                            </Flex>
                            <Button
                                    backgroundColor={"#D6517D"}
                                    borderRadius="5px"
                                    boxShadow={"0px 2px 2px 1px #0F0F0F"}
                                    color="white"
                                    cursor="pointer"
                                    fontFamily={"inherit"}
                                    padding="15px"
                                    marginTop="25px"  onClick={handleMint}>MintNow</Button>

                        </div>
                    ) : (
                        <Text
                            marginTop={"100px"}
                            fontSize="30px"
                            letterSpacing="-5.5%"
                            fontFamily={"VT323"}
                            color="#D6517D"
                            textShadow="0 2px 2px#000000">you are not connected yet</Text>
                    )
                };
            </Box>
        </Flex>
    )

};

export default MainMint;