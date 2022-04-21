//SPDX-License-Identifier: Unlicense

pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; //alloww function only for owners


contract RoboPunkNFT is ERC721,Ownable {

uint256 public mintPrice;
uint256 public totalSupply;
uint256 public maxSupply;
uint256 public maxPerWallet;
bool    public isPublicMintEnabled;
string internal baseTokenUri;  //opensea can determine where images are located
address payable public withdrawWallet;
mapping(address  => uint256) public walletMints; //keep track of all mints


constructor() payable ERC721("RoboPunks","RP") {
    mintPrice = 0.02 ether;
    totalSupply = 0;
    maxSupply = 1000;
    maxPerWallet = 3;
    //set withdraw wallet address
}

//owner here is deployer of contract
function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
isPublicMintEnabled = isPublicMintEnabled_;
}

function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
   
     baseTokenUri = baseTokenUri_;

}

function tokenUri(uint256 tokenId_) public view   returns (string memory){
    require(_exists(tokenId_),'token does not exist');
    // we are taking the uri for grabing the id and placing it behind the uri and attaching .json to the end of it
    //  this allow open sea to grab every single images of opensea its called toeknuri for 
    //  each tokens and thats how image is displayed on open sea
    return string(abi.encodePacked(baseTokenUri,Strings.toString(tokenId_), ".json"));
 
}

function withdraw() external onlyOwner {
    //we are grabing the wallet we are calling it then pass adress and balance this allows to withdraw funds
    (bool success, ) = withdrawWallet.call{ value: address(this).balance}(' ');
    require(success,"withdraw failed");
}

function mint(uint256 quantity_) public payable {
    require(isPublicMintEnabled,"minting not enabled");
    require(msg.value == quantity_ * mintPrice, "wrong mint value");
    require(totalSupply + quantity_ <= maxSupply, "sold out");
    //keep track of mint per quantit of wallets
    require(walletMints[msg.sender]+quantity_ <= maxPerWallet,"exceded max limit");

    for(uint256 i =0;i< quantity_;i++) {
        uint256 newTokenId = totalSupply+1;
        totalSupply++;

        _safeMint(msg.sender, newTokenId);
    }
}

}