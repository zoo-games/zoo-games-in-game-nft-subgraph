import { BigInt } from "@graphprotocol/graph-ts"

import {
  ERC721Manager,
  ERC721Created
} from "../generated/ERC721Manager/ERC721Manager"

import {
  Transfer,
  ManagedERC721
} from "../generated/templates/ManagedERC721/ManagedERC721"

import {
  ManagedERC721 as ManagedERC721Template,
} from "../generated/templates"

import { ERC721CollectionInfo, ERC721NFTInfo } from "../generated/schema"

export function handleERC721Created(event: ERC721Created): void {
  let collection = ERC721CollectionInfo.load(event.params._token.toHex());
  collection = new ERC721CollectionInfo(event.params._token.toHex());
  collection.address = event.params._token;
  collection.name = event.params._name;
  collection.symbol = event.params._symbol;
  collection.timestamp = event.block.timestamp;
  
  ManagedERC721Template.create(event.params._token);

  collection.save();
}

export function handleTransfer(event: Transfer): void {
  let nft = ERC721NFTInfo.load(event.address.toHex() + "_" + event.params.tokenId.toHex());
  if (nft === null) {
    nft = new ERC721NFTInfo(event.address.toHex() + "_" + event.params.tokenId.toHex());
    nft.collection = event.address;
    nft.tokenId = event.params.tokenId;
    nft.owner = event.params.to;
    nft.timestamp = event.block.timestamp;
    nft.uri = ManagedERC721.bind(event.address).tokenURI(event.params.tokenId);
    nft.save();
  } else {
    nft.owner = event.params.to;
    nft.timestamp = event.block.timestamp;
    nft.save();
  }
}
