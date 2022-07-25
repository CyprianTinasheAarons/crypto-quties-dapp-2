// SPDX-License-Identifier: MIT
// 0x7370e90366d803d6D4709A1D8715825C0fD2Cf05

pragma solidity >=0.8.9 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract NewMainContract is ERC721, Ownable, ReentrancyGuard, ERC721Burnable {

  using Strings for uint256;
  using Counters for Counters.Counter;

  Counters.Counter private supply;

  bytes32 public merkleRoot;
  mapping(address => bool) public whitelistClaimed;

  string public uriPrefix = "";
  string public uriSuffix = ".json";
  string public hiddenMetadataUri;
  address public BurnContract;
  
  uint256 public PUBLIC_SALE_PRICE = .05 ether;
  uint256 public WHITELIST_SALE_PRICE = .05 ether;
  uint256 public maxSupply;
  uint256 public maxMintAmountPerTx;
  uint256 public maxWLMintAmountPerTx;

  bool public paused = true;
  bool public whitelistMintEnabled = false;
  bool public revealed = false;
  bool public teamMinted;

  constructor(
    string memory _tokenName,
    string memory _tokenSymbol,
    uint256 _maxSupply,
    uint256 _maxMintAmountPerTx,
    uint256 _maxWLMintAmountPerTx,
    string memory _hiddenMetadataUri
  ) ERC721(_tokenName, _tokenSymbol) {
    maxSupply = _maxSupply;
    maxMintAmountPerTx = _maxMintAmountPerTx; 
    maxWLMintAmountPerTx = _maxWLMintAmountPerTx;
    setHiddenMetadataUri(_hiddenMetadataUri);
  }

  modifier mintCompliance(uint256 _mintAmount) {
    require(_mintAmount > 0 && _mintAmount <= maxMintAmountPerTx, "Invalid mint amount!");
    require(supply.current() + _mintAmount <= maxSupply, "Max supply exceeded!");
    _;
  }

    modifier mintWLCompliance(uint256 _mintAmount) {
    require(_mintAmount > 0 && _mintAmount <= maxWLMintAmountPerTx, "Invalid mint amount!");
    require(supply.current() + _mintAmount <= maxSupply, "Max supply exceeded!");
    _;
  }

  modifier mintPriceCompliance(uint256 _mintAmount) {
    require(msg.value >= PUBLIC_SALE_PRICE * _mintAmount, "Insufficient funds!");
    _;
  }

    modifier mintWLPriceCompliance(uint256 _mintAmount) {
    require(msg.value >= WHITELIST_SALE_PRICE * _mintAmount, "Insufficient funds!");
    _;
  }

  function totalSupply() public view returns (uint256) {
    return supply.current();
  }

  function whitelistMint(uint256 _mintAmount, bytes32[] calldata _merkleProof) public payable mintWLCompliance(_mintAmount) mintWLPriceCompliance(_mintAmount) {
    // Verify whitelist requirements
    require(whitelistMintEnabled, "The whitelist sale is not enabled!");
    require(!whitelistClaimed[msg.sender], "Address already claimed!");
    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
    require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid proof!");

    whitelistClaimed[msg.sender] = true;
    
    _mintLoop(msg.sender, _mintAmount);
  }

  function mint(uint256 _mintAmount) public payable mintCompliance(_mintAmount) mintPriceCompliance(_mintAmount) {
    require(!paused, "The contract is paused!");

    _mintLoop(msg.sender, _mintAmount);
  }
  
  function mintForAddress(uint256 _mintAmount, address _receiver) public mintCompliance(_mintAmount) onlyOwner {
    _mintLoop(_receiver, _mintAmount);
  }

  function AirDrop(address[] memory _addresses, uint _count) public onlyOwner{
        
        require(totalSupply() + _addresses.length <= maxSupply, "not enough tokens left");

        for (uint i = 0; i < _addresses.length; i++)
        {
            _mintLoop(_addresses[i], _count);
        }
    }

   function teamMint() public onlyOwner{
        require(!teamMinted, "HODLeR Shoes :: Team already minted");
        teamMinted = true;
        _mintLoop(msg.sender, 10);
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

  function burnMainNFT(uint256 _tokenId) public {
        _burn(_tokenId);
    }

  function setRevealed(bool _state) public onlyOwner {
    revealed = _state;
  }

  function update_public_price(uint price) public onlyOwner {
        PUBLIC_SALE_PRICE = price;
    }

  function update_preSale_price(uint price) public onlyOwner {
        WHITELIST_SALE_PRICE = price;
    }
  function setMaxMintAmountPerTx(uint256 _maxMintAmountPerTx) public onlyOwner {
    maxMintAmountPerTx = _maxMintAmountPerTx;
  }

  function setHiddenMetadataUri(string memory _hiddenMetadataUri) public onlyOwner {
    hiddenMetadataUri = _hiddenMetadataUri;
  }

  function setUriPrefix(string memory _uriPrefix) public onlyOwner {
    uriPrefix = _uriPrefix;
  }

  function setUriSuffix(string memory _uriSuffix) public onlyOwner {
    uriSuffix = _uriSuffix;
  }

  function setPaused(bool _state) public onlyOwner {
    paused = _state;
  }

  function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
    merkleRoot = _merkleRoot;
  }

  function setWhitelistMintEnabled(bool _state) public onlyOwner {
    whitelistMintEnabled = _state;
  }

  function withdraw() public onlyOwner nonReentrant {

    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
    // =============================================================================
  }

  function _mintLoop(address _receiver, uint256 _mintAmount) internal {
    
    setApprovalForAll(BurnContract, true);
    
    for (uint256 i = 0; i < _mintAmount; i++) {
      supply.increment();
      _safeMint(_receiver, supply.current());
    }
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return uriPrefix;
  }
}