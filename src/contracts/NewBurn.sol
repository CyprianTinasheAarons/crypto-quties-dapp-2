// SPDX-License-Identifier: MIT
// 0xE582A95DbfFBaA04Ef004f3D6c72Cb84dC2899E5

pragma solidity >=0.8.9 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

interface MAIN{
    function burnMainNFT( uint256 _tokenId) external;
}

contract FinalBurn is ERC721, Ownable, ReentrancyGuard {

  using Strings for uint256;
  using Counters for Counters.Counter;

  Counters.Counter private supply;

  bytes32 public merkleRoot;
  mapping(address => bool) public whitelistClaimed;

  string public uriPrefix = "";
  string public uriSuffix = ".json";
  string public hiddenMetadataUri;
  address public mainContract;

  uint256 public maxSupply;

  bool public paused = false;
  bool public revealed = false;

  constructor(
    string memory _tokenName,
    string memory _tokenSymbol,
    uint256 _maxSupply,
    string memory _hiddenMetadataUri,
    address _mainContract
  ) ERC721(_tokenName, _tokenSymbol) {
    maxSupply = _maxSupply;
    setHiddenMetadataUri(_hiddenMetadataUri);
    mainContract = _mainContract;
  }


  function totalSupply() public view returns (uint256) {
    return supply.current();
  }

  function burnNFT(uint256 tokenId) external payable {

      require(!paused, "Burner contract is paused!");
      //SetApprovalForAll between this contract and main contract
      if(IERC721(mainContract).ownerOf(tokenId) == msg.sender ){

        MAIN(mainContract).burnMainNFT(tokenId);
        _mintLoop(msg.sender, 1);
      }
      else {
          revert("Not the owner of NFT");
      }

    }

  function batchBurnNFTs( uint256[] memory tokenIds) public {
    require(!paused, "Burner contract is paused!");
    //SetApprovalForAll between this contract and main contract
    for(uint256 i = 0; i < tokenIds.length; i++){
        if(IERC721(mainContract).ownerOf(tokenIds[i]) == msg.sender ){

            MAIN(mainContract).burnMainNFT(tokenIds[i]);
            _mintLoop(msg.sender, 1);
        }
        else {
            revert("Not the owner of NFT");
        }
    }
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory ownedTokenIds = new uint256[](ownerTokenCount);
    uint256 currentTokenId = 1;
    uint256 ownedTokenIndex = 0;

    while (ownedTokenIndex < ownerTokenCount && currentTokenId <= maxSupply) {
      address currentTokenOwner = ownerOf(currentTokenId);

      if (currentTokenOwner == _owner) {
        ownedTokenIds[ownedTokenIndex] = currentTokenId;

        ownedTokenIndex++;
      }

      currentTokenId++;
    }

    return ownedTokenIds;
  }

  function tokenURI(uint256 _tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(_tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    if (revealed == false) {
      return hiddenMetadataUri;
    }

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, _tokenId.toString(), uriSuffix))
        : "";
  }

  function setMainContract(address _mainContract) external onlyOwner {
        mainContract = _mainContract;
    }

  function setRevealed(bool _state) public onlyOwner {
    revealed = _state;
  }

  function setUriPrefix(string memory _uriPrefix) public onlyOwner {
    uriPrefix = _uriPrefix;
  }

  function setHiddenMetadataUri(string memory _hiddenMetadataUri) public onlyOwner{
      hiddenMetadataUri = _hiddenMetadataUri;
  }

  function setUriSuffix(string memory _uriSuffix) public onlyOwner {
    uriSuffix = _uriSuffix;
  }

  function setPaused(bool _state) public onlyOwner {
    paused = _state;
  }

  function _mintLoop(address _receiver, uint256 _mintAmount) internal {

    for (uint256 i = 0; i < _mintAmount; i++) {
      supply.increment();
      _safeMint(_receiver, supply.current());
    }
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return uriPrefix;
  }
}