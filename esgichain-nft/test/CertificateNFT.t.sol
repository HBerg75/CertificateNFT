// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/CertificateNFT.sol";

contract CertificateNFTTest is Test {
    event CertificateMinted(uint256 indexed certId, uint256 indexed studentId, string course, uint256 timestamp);
    event CertificateRevoked(uint256 indexed certId, uint256 timestamp, string reason);
    
    AcademicCertificateNFT certificateNFT;
    address admin = address(this);
    address user = address(1);
    address unauthorizedUser = address(2);

    function setUp() public {
        certificateNFT = new AcademicCertificateNFT();
        // Accorde le rôle d'administrateur et de minter à l'adresse de test
        certificateNFT.grantRole(certificateNFT.DEFAULT_ADMIN_ROLE(), admin);
        certificateNFT.grantRole(certificateNFT.CERTIFICATE_ISSUER(), admin);
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
        assertEq(certInfo.isActive, false, "Le certificat devrait etre revoquer");
    }

    function testUpdateMetadata() public {
        uint256 certId = certificateNFT.mintCertificate(
            user, 
            "Alice Dupont", 
            2025001, 
            "Master en Blockchain", 
            unicode"Mention Très Bien", 
            "https://ipfs.io/ipfs/hash_du_certificat"
        );

        certificateNFT.updateCertificateMetadata(certId, "https://ipfs.io/ipfs/nouveau_hash");

        // Vérification via getCertificateDetails()
        AcademicCertificateNFT.CertificateInfo memory certInfo = certificateNFT.getCertificateDetails(certId);
        assertEq(certInfo.isActive, true, "Le certificat devrait toujours etre actif");
    }

    function testRevokeNonExistentCertificate() public {
        vm.expectRevert("Certificat introuvable");
        certificateNFT.revokeCertificate(999, "Erreur administrative");
    }

    function testUpdateNonExistentMetadata() public {
        vm.expectRevert("Certificat introuvable");
        certificateNFT.updateCertificateMetadata(999, "https://ipfs.io/ipfs/nouveau_hash");
    }

    function testRevokeAlreadyRevokedCertificate() public {
        uint256 certId = certificateNFT.mintCertificate(
            user, 
            "Alice Dupont", 
            2025001, 
            "Master en Blockchain", 
            unicode"Mention Très Bien", 
            "https://ipfs.io/ipfs/hash_du_certificat"
        );

        certificateNFT.revokeCertificate(certId, "Erreur administrative");

        vm.expectRevert("Certificat deja revoquer");
        certificateNFT.revokeCertificate(certId, "Deuxieme revocation");
    }

    function testUnauthorizedAccess() public {
        uint256 certId = certificateNFT.mintCertificate(
            user, 
            "Alice Dupont", 
            2025001, 
            "Master en Blockchain", 
            unicode"Mention Très Bien", 
            "https://ipfs.io/ipfs/hash_du_certificat"
        );

        // Simule une transaction depuis un utilisateur non autorisé
        vm.prank(unauthorizedUser);

        // Capture toute erreur, quelle qu'elle soit
        vm.expectRevert();
        certificateNFT.revokeCertificate(certId, "Tentative non autorisee");
    }

    function testGetCertificatesByStudent() public {
        uint256 certId1 = certificateNFT.mintCertificate(
            user, 
            "Alice Dupont", 
            2025001, 
            "Master en Blockchain", 
            unicode"Mention Très Bien", 
            "https://ipfs.io/ipfs/hash_du_certificat"
        );

        uint256 certId2 = certificateNFT.mintCertificate(
            user, 
            "Alice Dupont", 
            2025001, 
            "Doctorat en Cryptographie", 
            unicode"Mention Honorable", 
            "https://ipfs.io/ipfs/hash_du_certificat"
        );

        uint256[] memory certs = certificateNFT.getCertificatesByStudent(2025001);
        assertEq(certs.length, 2);
    }

    function testEventEmissionOnMint() public {
        vm.expectEmit(true, true, true, true);
        emit CertificateMinted(0, 2025001, "Master en Blockchain", block.timestamp);
        
        certificateNFT.mintCertificate(
            user, 
            "Alice Dupont", 
            2025001, 
            "Master en Blockchain", 
            unicode"Mention Très Bien", 
            "https://ipfs.io/ipfs/hash_du_certificat"
        );
    }

    function testEventEmissionOnRevoke() public {
        uint256 certId = certificateNFT.mintCertificate(
            user, 
            "Alice Dupont", 
            2025001, 
            "Master en Blockchain", 
            unicode"Mention Très Bien", 
            "https://ipfs.io/ipfs/hash_du_certificat"
        );

        vm.expectEmit(true, true, true, true);
        emit CertificateRevoked(certId, block.timestamp, "Erreur administrative");

        certificateNFT.revokeCertificate(certId, "Erreur administrative");
    }
}
