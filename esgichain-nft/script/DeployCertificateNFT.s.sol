// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {AcademicCertificateNFT} from "../src/CertificateNFT.sol";

contract DeployCertificateNFT is Script {
    uint256 public chainId = block.chainid;
    AcademicCertificateNFT public certificateNFT;

    address public dev_teyik0 =
        address(0x1A2cDc9Ea7dFc55aeaDb314bB8C3b09E938c989b);
    address public dev2_teyik0 =
        address(0xE1E71b5FeA42cBa159fF3f12C4C104eE38a33a2F);

    function setUp() public view {
        if (chainId == 43113) {
            // Fuji Testnet
        } else if (chainId == 137) {
            // Polygon mainnet
        }
    }

    function run() public {
        vm.startBroadcast();
        certificateNFT = new AcademicCertificateNFT();

        certificateNFT.mintCertificate(
            dev_teyik0,
            "Theo Samarasinghe",
            2025001,
            "Master - Ingenierie de la Blockchain",
            unicode"Mention - Très Bien",
            "https://ipfs.io/ipfs/hash_du_certificat"
        );

        certificateNFT.mintCertificate(
            dev_teyik0,
            "Alice Dupont",
            2025002,
            "Master - Architecture des Logiciels",
            unicode"Mention - Bien",
            "https://ipfs.io/ipfs/hash_du_certificat_alice"
        );

        certificateNFT.mintCertificate(
            dev_teyik0,
            "Bob Martin",
            2025003,
            "Master - Ingenierie Mobile et Objets Connectes",
            unicode"Mention - Assez Bien",
            "https://ipfs.io/ipfs/hash_du_certificat_bob"
        );

        certificateNFT.mintCertificate(
            dev_teyik0,
            "Claire Lefevre",
            2025004,
            "Master - Intelligence Artificielle et Big Data",
            unicode"Mention - Très Bien",
            "https://ipfs.io/ipfs/hash_du_certificat_claire"
        );

        certificateNFT.mintCertificate(
            dev_teyik0,
            "David Chen",
            2025005,
            "Master - Ingenierie du Web",
            unicode"Mention - Passable",
            "https://ipfs.io/ipfs/hash_du_certificat_david"
        );
        vm.stopBroadcast();
    }
}
