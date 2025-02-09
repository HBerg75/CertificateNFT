// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/CertificateNFT.sol";

contract CertificateNFTTest is Test {
    AcademicCertificateNFT certificateNFT;
    address user = address(1);

    function setUp() public {
        certificateNFT = new AcademicCertificateNFT();
        // Accorde le rôle d'administrateur au contrat de test
        certificateNFT.grantRole(certificateNFT.DEFAULT_ADMIN_ROLE(), address(this));
    }

    function testMintCertificate() public {
        uint256 certId = certificateNFT.mintCertificate(
            user, 
            "Alice Dupont", 
            2025001, 
            "Master en Blockchain", 
            unicode"Mention Très Bien", 
            "https://ipfs.io/ipfs/hash_du_certificat"
        );

        uint256[] memory certs = certificateNFT.getCertificatesByStudent(2025001);
        assertEq(certs.length, 1);
    }

    function testRevokeCertificate() public {
        uint256 certId = certificateNFT.mintCertificate(
            user, 
            "Alice Dupont", 
            2025001, 
            "Master en Blockchain", 
            unicode"Mention Très Bien", 
            "https://ipfs.io/ipfs/hash_du_certificat"
        );

        // Révocation du certificat
        certificateNFT.revokeCertificate(certId, "Erreur administrative");

        // Récupération des infos du certificat
        AcademicCertificateNFT.CertificateInfo memory certInfo = certificateNFT.getCertificateDetails(certId);

        // Vérifie que le certificat est bien révoqué
        assertEq(certInfo.isActive, false, "Le certificat devrait etre revoque");
    }
}
