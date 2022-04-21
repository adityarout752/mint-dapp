
// const hre = require("hardhat");

const main = async() =>{
  
  const RoboPunksNFT = await hre.ethers.getContractFactory("RoboPunkNFT");
  const roboPunksNFT = await RoboPunksNFT.deploy();

  await roboPunksNFT.deployed();

  console.log("RoboPunksNFT deployed to:", roboPunksNFT.address);
}


const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();